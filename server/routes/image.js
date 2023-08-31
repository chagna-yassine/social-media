import express from "express";
import { Post } from "../metadatServise/post.js";

const router = express.Router();

// uploding just a tet post for now
router.post('/upload', async (req, res) => {
    try {
        // get the text that the user want to post
        const {user_id, caption, text} = req.body;
        
        // check if the text is secure no sql injection
        // TODO

        const post = new Post({
            user_id: user_id,
            caption: caption,
            image_url: undefined,
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