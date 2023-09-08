import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    from : {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    to : [{type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true}],
    type: {type: String, require: true},
    createAt: {type: Date, default: Date.now}
});

export const Event = mongoose.model('Event', eventSchema);