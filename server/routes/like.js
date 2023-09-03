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
        
        // creat data for the notif 
        const likeData = {user_id, post_id}
        
        // When a new like is created, emit a 'likeAdded' event
        io.emit('likeAdded', { likeData });
        
        //Send a msg that the like created successfully else send an err msg
        res.status(201).json({ message: 'User like post successfully' });
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.post('/checkLike', async (req, res) => {
  try {
      //get the data
      const { user_id , post_id} = req.body;
      //search for the like
      const like = await Like.findOne({ user_id , post_id });
      //Check the like if it's exist or not
      if(!like){
         return res.status(201).json({ message: 'notLiked' });
      }
      //if it not exist send a notLiked msg else send a liked msg
      res.json({ message: 'liked' });
  }catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.post('/unLike', async (req, res) => {
  try {
      //get the data
      const { user_id , post_id} = req.body;
      //search for the like and delete it
      await Like.findOneAndDelete({ user_id , post_id });
      //Send a msg that the like deleted successfully else send an err msg
      res.status(201).json({ message: 'User unLiked successfully' });
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/countLike', async (req, res) => {
  try {
      //get the data
      const { post_id } = req.body;
      //search for the like and delete it
      const likeCount =  await Like.find({ post_id }).count({post_id});
      //Send a msg that the like deleted successfully else send an err msg
      res.status(201).json(likeCount);
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;