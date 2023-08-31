import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    text: {type: String},
    created_at: {type: Date, default: Date.now }
});

export const Comment = mongoose.model('comment', commentSchema);