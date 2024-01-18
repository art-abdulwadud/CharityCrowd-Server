const { admin } = require("../../admin");
const { ApolloError } = require("apollo-server-express");
const User = require("../../Models/userModel");

const userQueryResolvers = {
    getUserProfile : async (_root, args) => {
        try {
            const userDoc = await User.findById(args.userid);
            const fetchedUser = await admin.auth().getUserByEmail(userDoc.email);
            if (fetchedUser.customClaims && fetchedUser.customClaims.admin === true) Object.assign(userDoc, { admin: true, payment: userDoc.payment ? { ...userDoc.payment, cardNumber: userDoc.payment?.cardNumber?.toString() } : {} });
            return userDoc;
        } catch (error) {
            return new ApolloError(error.message);
        }
    },
    getRecentUsers : async (_root, args) => {
        try {
            const fetchedUser = await admin.auth().getUserByEmail(args.email);
            if (fetchedUser.customClaims && fetchedUser.customClaims.admin === true) {
                const userList = await User.find().sort({ createdAt: -1 });
                return userList;
            }
            return new ApolloError("Unauthorised request");
        } catch (error) {
            return new ApolloError(error.message);
        }
    },
    getAdminUsers : async (_root, args) => {
        try {
            const fetchedUser = await admin.auth().getUserByEmail(args.email);
            if (fetchedUser.customClaims && fetchedUser.customClaims.admin === true) {
                const userList = await User.find().where("admin").equals(true);
                return userList;
            }
            return new ApolloError("Unauthorised request");
        } catch (error) {
            return new ApolloError(error.message);
        }
    },
    getUserRole : async (_root, args) => {
        try {
            const currentUser = await admin.auth().getUserByEmail(args.currentUser);
            if (currentUser.customClaims && currentUser.customClaims.admin === true) {
                let results = { admin: false };
                const requestedUser = await admin.auth().getUserByEmail(args.requestedUser);
                if (requestedUser.customClaims && requestedUser.customClaims.admin === true) results = { admin: true };
                return results;
            }
            return new ApolloError("Unauthorised request");
        } catch (error) {
            return new ApolloError(error.message);
        }
    }
};

const userMutationResolvers = {
    signUpUser : async (_root, args) => {
        try {
            const { email, password } = args;
            const newUserObj = {
                email: email,
                emailVerified: false,
                password: password,
                displayName: email.split("@")[0],
                disabled: false
            };
            const user = await admin.auth().createUser(newUserObj);
            const userDoc = new User({
                _id: user.uid,
                email: email, 
                name: email.split("@")[0]
            });
            await userDoc.save();
            return userDoc;
        } catch (error) {
            return new ApolloError(error.message);
        }
    },
    updateUserProfile: async (_root, args) => {
        try {
            const { userid, updates } = args;
            const userDoc = await User.findById(userid);
            Object.assign(userDoc, updates);
            await userDoc.save();
            return "Success";
        } catch (error) {
            return new ApolloError(error.message);
        }
    }
};

module.exports = { userQueryResolvers, userMutationResolvers };
