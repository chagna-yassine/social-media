import express from "express";
import { Post } from "../metadatServise/post.js";
import { Comment } from "../metadatServise/comment.js";
import { Like } from "../metadatServise/like.js";
import multer, {diskStorage} from 'multer'
import path from 'path';
import ffmpeg from "fluent-ffmpeg";
import fs from 'fs';

const router = express.Router();

const imageStorage = diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./Blob/ImageBlob')
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + "--" + file.originalname)
    },
})

const uploadImg = multer({storage : imageStorage});

// uploding just a tet post for now
router.post('/uploadImg', uploadImg.single('image') , async (req, res) => {
    try {
        // get the text that the user want to post
        const {user_id, caption, text} = req.body;

        const mediaData = req.file
            ? {
                url: req.file.filename,
                type: req.file.mimetype,
                name: req.file.originalname,
                status: req.file.fieldname,
                }
            : {
                status: 'noMedia',
            };

        const post = new Post({
            user_id: user_id,
            caption: caption,
            media: mediaData,
            text: text
        });
        await post.save();
        res.status(201).json({message: 'post added successfully'});
    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const videoStorage = diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./Blob/VideoBlob')
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + "--" + file.originalname)
    },
})

const uploadVideo = multer({storage : videoStorage});

// uploding just a tet post for now
router.post('/uploadVideo', uploadVideo.single('video') , async (req, res) => {
    try {
        // get the text that the user want to post
        const {user_id, caption, text} = req.body;

        const mediaData = req.file
            ? {
                url: req.file.filename,
                type: req.file.mimetype,
                name: req.file.originalname,
                status: req.file.fieldname,
                }
            : {
                status: 'noMedia',
            };

        const inputVideoPath = `./Blob/VideoBlob/${mediaData.url}`;

        const outputPosterPath = `${mediaData.name}-poster.jpg`;
        await new Promise((resolve, reject) => {
            ffmpeg(inputVideoPath)
                .screenshot({
                    count: 1,
                    filename: outputPosterPath,
                    folder: path.dirname(`Blob/ImageBlob/${outputPosterPath}`), 
                })
                .on('end', resolve)
                .on('error', reject);
        });

        const post = new Post({
            user_id: user_id,
            caption: caption,
            media: {...mediaData,poster_url : outputPosterPath},
            text: text
        });
        await post.save();
        res.status(201).json({message: 'post added successfully'});
    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/uploadPost', async (req, res) => {
    try {
        const { user_id, caption, text }= req.body;

        const post = new Post({
            user_id,
            caption,
            text
        });
        await post.save();

        res.status(201).json({message: 'post added successfully'});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all the post
router.get('/', async (req, res) => {
    try {
        const id = req.query.user_id;

        const posts = await Post.find({ user_id: id }).sort({created_at : -1}).populate('user_id', 'username profilePic');

        const newPosts = await Promise.all(
            posts.map(async (post) => {
              const post_id = post._id;
              let isLiked;
              //search for the like
              const like = await Like.findOne({ user_id : id, post_id });
              //Check the like if it's exist or not
              if (!like) {
                isLiked = 'notLiked';
              } else {
                //if it not exist send a notLiked msg else send a liked msg
                isLiked = 'liked';
              }
      
              const likeCount = await Like.find({ post_id }).countDocuments();
              const commentCount = await Comment.find({ post_id }).countDocuments();
              const plainPost = post.toObject();
    
              return { ...plainPost, likeStatus: isLiked, likeCount, commentCount }
            })
          );

        res.status(201).json(newPosts);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/deletePost', async (req, res) => {
    try {
        const {id} = req.body;

        const post =  await Post.findOne({_id:id})

        if(post.media.status === 'image'){
            fs.unlinkSync(`Blob/ImageBlob/${post.media.url}`)
        }

        if(post.media.status === 'video'){
            fs.unlinkSync(`Blob/VideoBlob/${post.media.url}`)
            fs.unlinkSync(`Blob/ImageBlob/${post.media.poster_url}`)
        }

        await Comment.deleteMany({post_id : id})

        await Like.deleteMany({post_id : id})

        await Post.findByIdAndDelete(id);

        res.status(201).json({message: "Post deleted successfully"});
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;