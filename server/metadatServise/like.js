import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    created_at: {type: Date, default: Date.now }
});

export const Like = mongoose.model('like', likeSchema);