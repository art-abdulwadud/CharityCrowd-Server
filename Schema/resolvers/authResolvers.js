const { admin } = require("../../admin");
const { ApolloError } = require("apollo-server-express");
const User = require("../../Models/userModel");

const authResolvers = {
    addCustomClaim : async (_root, args) => {
        try {
            const currentUser = await admin.auth().getUserByEmail(args.currentUser);
            if (currentUser.customClaims && currentUser.customClaims.admin === true) {
                await admin.auth().setCustomUserClaims(args.userid, { ...args.claim });
                const user = await User.findById(args.userid);
                user[Object.keys(args.claim)[0]] = Object.values(args.claim)[0];
                await user.save();
                return "Success";
            }
            return new ApolloError("Unauthorised request");
        } catch (error) {
            return new ApolloError(error.message);
        }
    }
};

module.exports = { authResolvers };
