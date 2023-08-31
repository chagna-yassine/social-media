import express from "express";
import { Comment } from "../metadatServise/comments";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        //get the data
        const user_id = req.query.user_id;
        const post_id = req.query.post_id;
        const text = req.body;
        //create a new comment
        const comment = new Comment({ user_id , post_id, text });
        await comment.save();
        //Send a msg that the comment created successfully else send an err msg
        res.status(201).json({ message: 'User comment post successfully' });
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
});

export default router;