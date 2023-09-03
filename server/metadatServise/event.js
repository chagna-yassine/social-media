import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    event: {type: String, require: true},
    createAt: {type: Date, default: Date.now}
});

export const Event = mongoose.model('Event', eventSchema);