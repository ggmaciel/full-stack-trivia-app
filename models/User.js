const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const UserSchema = new Schema({
    handle: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        default: 0,
    },
    matches: [{}],
    register_date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = User = mongoose.model("users", UserSchema);
