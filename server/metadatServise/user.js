import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  cover: { type: String, default: "DefaultCover.jpeg" },
  profilePic: { type: String, default: "DefaultPic.jpeg" },
  bio: { type: String, default: "" },
  password: { type: String, required: true },
  created_at: {type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);