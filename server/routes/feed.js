import express from "express";
import { Follow } from "../metadatServise/follow.js";
import { Post } from "../metadatServise/post.js";
import { Like } from "../metadatServise/like.js";
import { Comment } from "../metadatServise/comment.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
      const {user_id} = req.body; // Replace with your actual user ID

      const likedPost = await Like.find({user_id}).distinct('post_id')
  
      // Step 1: Retrieve the users you are following
      const followingUsers = await Follow.find({ follower: user_id }).distinct('following');
  
      // Step 2: Retrieve posts of the followed users
      const postsOfFollowing = await Post.find({ user_id: { $in: followingUsers } , _id: { $nin: likedPost} }).populate('user_id', 'username');
  
      const userPosts = await Post.find({ user_id , _id: { $nin: likedPost} }).populate('user_id', 'username'); // Find all posts for the specified user
  
      const meAndMyFollower = userPosts.concat(postsOfFollowing).sort(() => Math.random() - 0.5);
  
      const otherPosts = await Post.find({ user_id: { $ne: user_id, $nin: followingUsers } , _id: { $nin: likedPost} }).populate('user_id', 'username'); // Find posts for other users
  
      // Shuffle the posts for other users
      const shuffledOtherPosts =  otherPosts.sort(() => Math.random() - 0.5);
  
      // Combine user's posts and shuffled other posts
      const randomPosts =  meAndMyFollower.concat(shuffledOtherPosts);
  
      const newFeed = await Promise.all(
        randomPosts.map(async (post) => {
          const post_id = post._id;
          let isLiked;
          //search for the like
          const like = await Like.findOne({ user_id, post_id });
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
      //Send a msg that the comment created successfully else send an err msg
      res.status(201).json(newFeed);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;