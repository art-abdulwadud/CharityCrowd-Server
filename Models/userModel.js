const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: String,
    name: String,
    email: String,
    admin: Boolean,
    bio: String,
    country: String,
    city: String,
    address: String,
    payment: {
        cardNumber: Number,
        nameOnCard: String,
        expiryDate: Date,
        cvv: String
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
