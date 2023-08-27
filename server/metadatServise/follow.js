import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
  follower: { type: String, required: true },
  following: { type: String, required: true },
});

export const Follow = mongoose.model('follows', followSchema);