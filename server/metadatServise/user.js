import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model('User', userSchema);