import express from "express";
import { User } from "../metadatServise/user.js";

const router = express.Router();


router.get('/', async (req, res) => {
    try {
      //Get the username query
      const { username } = req.query;
      //create a new pattern for the query
      const regex = new RegExp(`^${username}`,'i')
      //get the users that have the same username pattern
      const users = await User.find({ username : regex });
      //send an err if there is no users with the pattern
      if (!users) {
        return res.status(401).json({ errName: 'NotFound'});
      }
      //send the users
      res.json(users);
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.post('/users', async (req, res) => {
    try {
      //Get the username from the body
      const { username } = req.body;
      //get the user that have the same
      const user = await User.findOne({ username });
      //send an err if there is no user with this username
      if (!user) {
        return res.status(401).json({ errName: 'NotFound'});
      }
      //send the user
      res.json(user);
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
});

export default router;