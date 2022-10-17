const { admin } = require("../../admin");
const { ApolloError } = require("apollo-server-express");

const authResolvers = {
    addCustomClaim : async (_root, args) => {
        try {
            const currentUser = await admin.auth().getUserByEmail(args.currentUser);
            if (currentUser.customClaims && currentUser.customClaims.admin === true) {
                await admin.auth().setCustomUserClaims(args.userid, { ...args.claim });
                return "Success";
            }
            throw new ApolloError("Unauthorised request");
        } catch (error) {
            throw new ApolloError(error.message);
        }
    },
    removeCustomClaim : async (_root, args) => {
        try {
            const currentUser = await admin.auth().getUserByEmail(args.currentUser);
            if (currentUser.customClaims && currentUser.customClaims.admin === true) {
                await admin.auth().updateUser(args.userid, { ...args.claim });
                return "Success";
            }
            throw new ApolloError("Unauthorised request");
        } catch (error) {
            throw new ApolloError(error.message);
        }
    }
};

module.exports = { authResolvers };
