const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: String,
    name: String,
    email: String,
    admin: Boolean
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
