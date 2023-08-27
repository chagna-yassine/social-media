import express from "express";
import mongoose, { setDriver } from "mongoose";
import { Conversation } from "../metadatServise/conversation.js";

const router = express.Router();

router.get('/createConversation', async (req, res) => {
    try {
        //get the data
        const { first , second } = req.body;
        //create a new follow
        const newConversation = new Conversation({ 
          participants : {first , second},
          messages : []
        });
        await newConversation.save();
        const conversation = await Conversation.findById(newConversation._id).populate('participants.first participants.second', 'username')
        //Send a msg that the follow created successfully else send an err msg
        res.send(conversation);
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
});


router.post('/sendMessage', async (req, res) => {
    try {
        //get the data
        const { senderId , content } = req.body;
        const conversation = await Conversation.findOneAndUpdate({
          $or: [
            { "participants.first": senderId },
            { "participants.second": senderId }
          ]
        },
        {
          $push: {
            messages : {
              sender : senderId,
              content
            }
          },
          $set: {
            lastMessageDate : new Date(),
          }
        },
        {
          new : true
        })
        .populate('participants.first','username')
        .populate('participants.second','username');
        
        res.status(201).json({messages : conversation.messages});

    }catch (error) {
      res.status(500).json({ error: error.message });
    }

});

router.post('/getConversations', async (req, res) => {
    try {
        //get the data
        const { userId } = req.body;

        const myConversations = await Conversation.find(
          {
            "participants.first" : userId ,
            messages: {
              $not: {
                $size: 0
              }
            }
          }
        )
        .sort({lastMessageDate : -1})
        .populate('participants.first','username')
        .populate('participants.second','username');

        if (myConversations.length === 0) { // Use .length instead of === []
          return res.status(201).json({ message: "noConversation" });
        }

        res.status(201).json({ myConversations });
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.post('/getMessages', async (req, res) => {
  try {
      //get the data
      const { senderId } = req.body;
      const conversation = await Conversation.findOne({
        $or: [
            { "participants.first": senderId },
            { "participants.second": senderId }
          ]
      })
      .populate('participants.first','username')
      .populate('participants.second','username');
      
      res.status(201).json({messages : conversation.messages});

  }catch (error) {
    res.status(500).json({ error: error.message });
  }

});

export default router;