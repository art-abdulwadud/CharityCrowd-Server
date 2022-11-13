const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationSchema = new Schema({
    userId: String,
    projectId: String,
    amountDonated: Number,
    modeOfPayment: String
}, { timestamps: true });

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
