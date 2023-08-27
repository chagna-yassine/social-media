import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const conversationSchema = new mongoose.Schema({
  participants: { 
    first: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    second: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   },
  messages: [messageSchema],
  lastMessageDate: { type: Date, default: Date.now }
});

export const Conversation = mongoose.model('Conversation', conversationSchema);
