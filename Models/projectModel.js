const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: String,
    requiredAmount: Number,
    currentAmount: Number,
    firstDonation: {
        userId: String,
        amount: String,
        timestamp: Date
    },
    topDonation: {
        userId: String,
        amount: String,
        timestamp: Date
    },
    lastDonation: {
        userId: String,
        amount: String,
        timestamp: Date
    },
    description: String,
    organizer: {
        name: String,
        location: String,
        email: String
    },
    beneficiary: {
        name: String,
        location: String,
        email: String
    },
    subscribedUsers: Array,
    numberOfDonations: Number,
    userId: String
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
