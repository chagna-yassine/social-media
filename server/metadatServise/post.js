import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    caption: {type: String},
    image_url: {type: String},
    text: {type: String},
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date, default: Date.now }
});

export const Post = mongoose.model('Post', postSchema);