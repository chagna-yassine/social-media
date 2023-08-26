import express from "express";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Post } from "../metadatServise/post.js";

const router = express.Router();

// uploding just a tet post for now
router.post('/upload', async (req, res) => {
    try {
        // get the text that the user want to post
        const {caption, text} = req.body;
        
        // check if the text is secure no sql injection
        // TODO

        const post = new Post({
            post_id: new mongoose.Types.ObjectId,
            user_id: undefined,
            caption,
            image_url: undefined,
            text,
            created_at: undefined
        });
        await post.save();
        res.status(201).json({message: 'post added successfully'});
    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;