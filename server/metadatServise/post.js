import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    caption: {type: String},
    media: {
        url : {type: String},
        name : {type: String},
        type : {type: String},
        status: {type: String , default: "noMedia"}
    },
    text: {type: String},
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date, default: Date.now }
});

export const Post = mongoose.model('Post', postSchema);