const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationSchema = new Schema({
    name: String,
    userId: String,
    amountDonated: String,
    modeOfPayment: String
}, { timestamps: true });

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
