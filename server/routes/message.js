import express from "express";
import { Conversation } from "../metadatServise/conversation.js";
import mongoose from "mongoose";

const router = express.Router();

router.post('/createConversation', async (req, res) => {
    try {
        //get the data from api
        const { first , second } = req.body;
        //Check if the conver sation is already exist
        const isExist = await Conversation.findOne({
            $or: [
              { "participants.first": first , "participants.second" : second },
              { "participants.first": second , "participants.second" : first }
            ],
        }).populate('participants.first participants.second', 'username');

       //if the conversation exist return the conversation id and the user name of the receiver
        if(isExist){
          return res.status(201).json({
            id : isExist._id , 
            username : isExist.participants.first._id.toString() === second ? 
            isExist.participants.first.username : 
            isExist.participants.second.username
          });
        }

      //else creat a new conversation
        const newConversation = new Conversation({ 
          participants : {first , second},
          messages : []
        });

      //save the conversation
        await newConversation.save();
      
      //Find the new conversation to populate the usernames
      const conversation = await Conversation.findById(newConversation._id)
      .populate('participants.first participants.second', 'username')

      //Send the new conversation id and the user name of the receiver
      res.status(201).json({
        id : conversation._id , 
        username : conversation.participants.first._id.toString() === second ? 
        conversation.participants.first.username : 
        conversation.participants.second.username
      });

    }catch (error) {
      res.status(500).json({ error: error.message });
    }
});


router.post('/sendMessage', async (req, res) => {
    try {
        //get the data from api
        const { conversationId , senderId , content } = req.body;

        //find the conversation
        //push the new msg to the arr messages
        //update the last message date to the current date
        const conversation = await Conversation.findOneAndUpdate({
          _id: conversationId ,
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
        
        //return the messages
        res.status(201).json({messages : conversation.messages});

    }catch (error) {
      res.status(500).json({ error: error.message });
    }

});

router.post('/getConversations', async (req, res) => {
    try {
        //get the data from api
        const  { userId }  = req.body;

        //find all the conversations that :
        //the user participate in 
        //the msg arr not empty
        //And sorted by the lastMessageDate desc
        const myConversations  = await Conversation.aggregate([
          {
            $match: {
              $or: [
                { 'participants.first': new mongoose.Types.ObjectId(userId) },
                { 'participants.second': new mongoose.Types.ObjectId(userId) }
              ]
            }
          },
          {
            $project: {
              participants: 1,
              otherParticipant: {
                $cond: {
                  if: { $eq: ['$participants.first', new mongoose.Types.ObjectId(userId)] },
                  then: '$participants.second',
                  else: '$participants.first'
                }
              },
              lastMessageDate : 1
            }
          }
        ]).sort({lastMessageDate : -1}).lookup({
          from: 'users',
          localField: "otherParticipant",
          foreignField: "_id",
          as: "username",
        });;
        

        //if there is no conversations return a noConversation message
        if (myConversations.length === 0) {
          return res.status(201).json({ message: "noConversation" });
        }

        //else return the conversations arr
        res.status(201).json(myConversations);
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.post('/getMessages', async (req, res) => {
  try {
      //get the data from the api
      const { conversationId ,  senderId } = req.body;

      //find the conversation that the user participate in
      const conversation = await Conversation.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(conversationId),
            $or: [
              { 'participants.first': new mongoose.Types.ObjectId(senderId) },
              { 'participants.second': new mongoose.Types.ObjectId(senderId) }
            ]
          }
        },
        {
          $project: {
            messages: 1,
            otherParticipant: {
              $cond: {
                if: { $eq: ['$participants.first', new mongoose.Types.ObjectId(senderId)] },
                then: '$participants.second',
                else: '$participants.first'
              }
            }
          }
        }
      ]).lookup({
        from: 'users',
        localField: "otherParticipant",
        foreignField: "_id",
        as: "username",
      })
      
      //return the conversation messages
      res.status(201).json(conversation[0]);

  }catch (error) {
    res.status(500).json({ error: error.message });
  }

});

export default router;