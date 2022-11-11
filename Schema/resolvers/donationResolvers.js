// const { admin } = require("../../admin");
const { ApolloError } = require("apollo-server-express");
const Donation = require("../../Models/donationModel");
const User = require("../../Models/userModel");
const Project = require("../../Models/projectModel");

const donationResolvers = {
    addDonation : async (_root, args) => {
        try {
            const { donation } = args;
            const { userId, amountToDonate, modeOfPayment, subscribed, projectId, anonymous } = donation;
            // TODO: add api for verifing and making payment
            // Once payment is verified and made, continue 👇
            const newPayment = new Donation({ userId: userId, amountDonated: amountToDonate, modeOfPayment: modeOfPayment, anonymous: anonymous });
            await newPayment.save();
            // Save the first, last and top donation in current project
            // Add notification of the donation for the user and anyone subscribed
            const currentUser = await User.findById(userId);
            const currentProject = await Project.findById(projectId);
            const currentAmount = parseFloat(currentProject.currentAmount) + parseFloat(amountToDonate);
            Object.assign(currentProject, { currentAmount: currentAmount, numberOfDonations: parseInt(currentProject.numberOfDonations) + 1, donations: currentProject.donations ? [...currentProject.donations, newPayment._id] : [newPayment._id] });
            Object.assign(currentUser, { donations: currentUser.donations ? [...currentUser.donations, newPayment._id] : [newPayment._id] });
            if (currentProject.numberOfDonations === 0) Object.assign(currentProject, { firstDonation: newPayment });
            if (currentProject.numberOfDonations !== 0) Object.assign(currentProject, { lastDonation: newPayment });
            if (!currentProject.lastDonation || currentProject.lastDonation?.toString() < amountToDonate) Object.assign(currentProject, { topDonation: newPayment });
            if (subscribed) {
                Object.assign(currentUser, { subscriptions: currentUser.subscriptions ? [...currentUser.subscriptions, projectId] : [projectId] });
                Object.assign(currentProject, { subscribedUsers: currentProject.subscribedUsers ? [...currentProject.subscribedUsers, userId] : [userId] });
            }
            await currentUser.save();
            await currentProject.save();
            return newPayment;
        } catch (error) {
            throw new ApolloError(error.message);
        }
    }
};

module.exports = { donationResolvers };
