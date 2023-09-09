import express from "express";
import { Post } from "../metadatServise/post.js";
import { Event } from "../metadatServise/event.js";
import { User } from "../metadatServise/user.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        // get event data from api
        const {from, to, type} = req.body;

        const event = new Event({ from, to, type});
        await event.save();
        // send success msg
        res.status(201).json({ message: 'Event was added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/GetId', async (req, res) => {
    try {
        // get event data from api
        const {post_id} = req.body;
      
        // Find the post with the given post_id and select the user_id field
        const post = await Post.findById(post_id).select("user_id");
    
        if (!post) {
            throw new Error("Post not found");
        }
    
        // Return the user_id
        // send success msg
        res.status(201).json(post.user_id);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/Get', async (req, res) => {
    try {      
        // Find the post with the given post_id and select the user_id field
        const events = await Event.find({})
    
        // send success msg
        res.status(201).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/update', async (req, res) => {
    try {
        //get the data
        const {id} = req.body;
        await Event.findOneAndUpdate({ _id : id },{
            seen : true
        });
    
        res.status(201).json({message: "Updated"});
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/GetName', async (req, res) => {
    try {
        // get event data from api
        const {_id} = req.body;
      
        // Find the name with the given _id and select the username field
        const user = await User.findById(_id).select("username");
    
        if (!user) {
            throw new Error("user not found");
        }
    
        // Return the username
        // send success msg
        res.status(201).json(user.username);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default router;