import express from "express";
import { Like } from "../metadatServise/like.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        //get the data
        const user_id = req.query.user_id;
        const post_id = req.query.post_id;
        //create a new like
        const like = new Like({ user_id , post_id });
        await like.save();
        //Send a msg that the like created successfully else send an err msg
        res.status(201).json({ message: 'User like post successfully' });
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
});

export default router;