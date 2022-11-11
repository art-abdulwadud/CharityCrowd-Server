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
            const newPayment = new Donation({ userId: userId, amountDonated: amountToDonate, modeOfPayment: modeOfPayment });
            await newPayment.save();
            // if user subscribed to a payment, update user details and project details
            // If anonymous is true, set anonymous field to true in user document
            // Add notification of the donation for the user and anyone subscribed
            const currentUser = await User.findById(userId);
            const currentProject = await Project.findById(projectId);
            if (subscribed) {
                Object.assign(currentUser, { subscriptions: currentUser.subscriptions ? [...currentUser.subscriptions, projectId] : [projectId] });
                Object.assign(currentProject, { subscribedUsers: currentProject.subscribedUsers ? [...currentProject.subscribedUsers, userId] : [userId] });
            }
            if (anonymous) Object.assign(currentUser, { anonymous: true });
            await currentUser.save();
            await currentProject.save();
            return newPayment;
        } catch (error) {
            throw new ApolloError(error.message);
        }
    }
};

module.exports = { donationResolvers };
