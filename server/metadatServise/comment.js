import mongoose from "mongoose";

const repliesSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    cmnt_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment'},
    replied_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    text: {type: String},
    createdAt: { type: Date, default: Date.now }
  });

const commentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    text: {type: String},
    replies: [repliesSchema],
    created_at: {type: Date, default: Date.now },
});

export const Comment = mongoose.model('comment', commentSchema);