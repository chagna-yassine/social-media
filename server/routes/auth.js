import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../metadatServise/user.js";
import mongoose from "mongoose";

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    //get the data
    const {firstName,lastName,age,phone,email,username,password} = req.body;
    //check if the phone already existed
    const phoneExist = await User.findOne({ phone });
    //check if the email already existed
    const emailExist = await User.findOne({ email });
    //check if the username already existed
    const usernameExist = await User.findOne({ username });

    //check if there is an err and send the name of it 
    if(phoneExist){
      res.status(201).json({ errName: 'PhoneErr' });
    }else if(emailExist){
      res.status(201).json({ errName: 'EmailErr' });
    }else if(usernameExist){
      res.status(201).json({ errName: 'UsernameErr' });
    }else{// If there is no err hashed the password and create a new user in the db
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = new User({
        firstName,
        lastName,
        age,
        phone,
        email,
        username,
        password: hashedPassword,
      });
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    }
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    //get the data
    const { username, password } = req.body;

    //check if the user existed
    const user = await User.findOne({ username });

    //send an err if the user doesn't exist
    if (!user) {
      return res.status(401).json({ errName: 'Incorrect'});
    }

    //Check the password if it's correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    //send an err if the password incorrect
    if (!passwordMatch) {
      return res.status(401).json({ errName: 'Incorrect'});
    }

    //Cnnect the user to his account and create his token if there isn't an err
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');

    res.json({ token , username , id : user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/checkExistence', async (req, res) => {
  try {
    //get the data
    const { userId , username} = req.body;

    if(!mongoose.Types.ObjectId.isValid(userId)){
      return res.status(404).json({ isExist: false });
    }
    
    const idExistence = await User.findById(userId);

    if (!idExistence) {
      return res.status(404).json({ isExist: false });
    }

    const usernameExistence = await User.findOne({ username });

    if (!usernameExistence) {
      return res.status(404).json({ isExist: false });
    }

    res.status(201).json({ isExist: true });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;