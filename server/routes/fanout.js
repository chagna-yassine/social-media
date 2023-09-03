import express from "express";
import { Event } from "../metadatServise/event.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        // get event data from api
        const {user_id, content} = req.body;

        const event = new Event({ user_id, content});
        await event.save();
        // send success msg
        res.status(201).json({ message: 'User like post successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default router;