import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    post_id: {type: mongoose.Schema.Types.ObjectId},
    user_id: {type: mongoose.Schema.Types.ObjectId},
    caption: {type: String},
    image_url: {type: String},
    text: {type: String},
    created_at: {type: Date},
    updated_at: {type: Date}
});

export const Post = mongoose.model('Post', postSchema);