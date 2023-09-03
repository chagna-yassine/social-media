import express from "express";
import { Comment } from "../metadatServise/comment.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        //get the data
        // const user_id = req.query.user_id;
        // const post_id = req.query.post_id;
        const {user_id, post_id, text} = req.body;
        //create a new comment
        const comment = new Comment({ user_id , post_id, text });
        await comment.save();
        //Send a msg that the comment created successfully else send an err msg
        res.status(201).json({ message: 'User comment post successfully' });
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.get('/Get', async (req, res) => {
  try {
      const comments = await Comment.find({}).sort({created_at : -1}).populate('user_id','username profilePic').populate('replies.user_id' , 'username profilePic');

      res.json(comments);
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/countComment', async (req, res) => {
  try {
      //get the data
      const { post_id } = req.body;
      //search for the like and delete it
      const commentCount =  await Comment.find({ post_id }).count({post_id});
      //Send a msg that the comment deleted successfully else send an err msg
      res.status(201).json(commentCount);
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/sendReply', async (req, res) => {
  try {
      //get the data from api
      const { commentId , user_id , post_id , replied_to , content } = req.body;

      await Comment.findOneAndUpdate({
        _id: commentId
      },
      {
        $push: {
          replies : {
            user_id,
            post_id,
            cmnt_id: commentId,
            replied_to,
            text: content 
          }
        },
      })
      
      res.status(201).json({messages : "Reply Sent Successfully"});

  }catch (error) {
    res.status(500).json({ error: error.message });
  }

});

export default router;