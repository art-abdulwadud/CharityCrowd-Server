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
            const newPayment = new Donation({ userId: userId, projectId: projectId, amountDonated: amountToDonate, modeOfPayment: modeOfPayment, anonymous: anonymous });
            await newPayment.save();
            // Add notification of the donation for the user and anyone subscribed
            const currentUser = await User.findById(userId);
            const currentProject = await Project.findById(projectId);
            const currentAmount = parseFloat(currentProject.currentAmount) + parseFloat(amountToDonate);
            const donationStats = { userId: userId, amount: amountToDonate, timestamp: newPayment.createdAt };
            if (currentProject.numberOfDonations == 0) Object.assign(currentProject, { firstDonation: donationStats});
            if (currentProject.numberOfDonations != 0) Object.assign(currentProject, { lastDonation: donationStats});
            if (!currentProject.lastDonation || currentProject.lastDonation?.toString() < amountToDonate) Object.assign(currentProject, { topDonation: donationStats });
            if (subscribed && subscribed === true) {
                currentUser.subscriptions.push([projectId, amountToDonate]);
                currentProject.subscribedUsers.push([userId, amountToDonate]);
            }
            if (anonymous && anonymous === true) Object.assign(currentUser, { anonymous: true });
            Object.assign(currentProject, { currentAmount: currentAmount, numberOfDonations: parseInt(currentProject.numberOfDonations) + 1 });
            await currentUser.save();
            await currentProject.save();
            return newPayment;
        } catch (error) {
            throw new ApolloError(error.message);
        }
    }
};

module.exports = { donationResolvers };
