import express from "express";
import { Follow } from "../metadatServise/follow.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        //get the data
        const { follower , following} = req.body;
        //create a new follow
        const follow = new Follow({ follower , following });
        await follow.save();
        //Send a msg that the follow created successfully else send an err msg
        res.status(201).json({ message: 'User followed successfully' });
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.post('/checkFollow', async (req, res) => {
    try {
        //get the data
        const { follower , following} = req.body;
        //search for the follow
        const follow = await Follow.findOne({ follower , following });
        //Check the follow if it's exist or not
        if(!follow){
           return res.status(201).json({ message: 'notFollowing' });
        }
        //if it not exist send a notfollowing msg else send a following msg
        res.json({ message: 'following' });
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/unFollow', async (req, res) => {
    try {
        //get the data
        const { follower , following} = req.body;
        //search for the follow and delete it
        await Follow.findOneAndDelete({ follower , following });
        //Send a msg that the follow deleted successfully else send an err msg
        res.status(201).json({ message: 'User unfollowed successfully' });
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
});

export default router;