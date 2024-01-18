// const { admin } = require("../../admin");
const { ApolloError } = require("apollo-server-express");
const Donation = require("../../Models/donationModel");
const User = require("../../Models/userModel");
const Project = require("../../Models/projectModel");

const donationResolvers = {
    getDonationsByProjectId: async (_root, args) => {
        try {
            const donations = await Donation.find({ projectId: args.projectid }).sort({ createdAt: -1 });
            return donations;
        } catch (error) {
            return new ApolloError(error.message);
        }
    },
    getDonationsByUserId: async (_root, args) => {
        try {
            const donations = await Donation.find({ userId: args.userid }).sort({ createdAt: -1 });
            return donations;
        } catch (error) {
            return new ApolloError(error.message);
        }
    },
    getDonationsByProjectUserId: async (_root, args) => {
        try {
            const donations = await Donation.find({ userId: args.userid, projectId: args.projectid }).sort({ createdAt: -1 });
            return donations;
        } catch (error) {
            return new ApolloError(error.message);
        }
    }
};

const donationMutationResolvers = {
    addDonation : async (_root, args) => {
        try {
            // TODO: Check if user is logged in first
            const { donation } = args;
            const { userId, amountToDonate, modeOfPayment, subscribed, projectId, anonymous } = donation;
            // TODO: add api for verifing and making payment
            // Once payment is verified and made, continue 👇
            const newPayment = new Donation({ userId: userId, projectId: projectId, amountDonated: amountToDonate, modeOfPayment: modeOfPayment, anonymous: anonymous });
            await newPayment.save();
            // TODO: Add notification of the donation for the user and anyone subscribed
            const currentUser = await User.findById(userId);
            const currentProject = await Project.findById(projectId);
            const currentAmount = parseFloat(currentProject.currentAmount) + parseFloat(amountToDonate);
            const donationStats = { userId: userId, amount: amountToDonate, timestamp: newPayment.createdAt };
            if (currentProject.numberOfDonations == 0) Object.assign(currentProject, { firstDonation: donationStats, lastDonation: donationStats });
            if (currentProject.numberOfDonations != 0) Object.assign(currentProject, { lastDonation: donationStats });
            // TODO: Calculate the top donation
            if (subscribed && subscribed === true) {
                await new User.updateOne({ _id: userId }, { $addToSet: { subscriptions: [projectId, amountToDonate] } });
                await new Project.updateOne({ _id: projectId }, { $addToSet: { subscribedUsers: [userId, amountToDonate] } });
            }
            if (anonymous && anonymous === true) Object.assign(currentUser, { anonymous: true });
            Object.assign(currentProject, { currentAmount: currentAmount, numberOfDonations: parseInt(currentProject.numberOfDonations) + 1 });
            await currentUser.save();
            await currentProject.save();
            return newPayment;
        } catch (error) {
            return new ApolloError(error.message);
        }
    }
};

module.exports = { donationResolvers, donationMutationResolvers };
