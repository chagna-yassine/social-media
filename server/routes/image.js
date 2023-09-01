import express from "express";
import { Post } from "../metadatServise/post.js";
import multer, {diskStorage} from 'multer'

const router = express.Router();

const imageStorage = diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./Blob/ImageBlob')
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + "--" + file.originalname)
    },
})

const upload = multer({storage : imageStorage});

// uploding just a tet post for now
router.post('/upload', upload.single('media') , async (req, res) => {
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

// Get all the post
router.get('/', async (req, res) => {
    try {
        const id = req.query.user_id;

        // const regex = new RegExp(`^${id}`);

        const posts = await Post.find({ user_id: id }).sort({created_at : -1});

        // console.log('req.body');

        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;