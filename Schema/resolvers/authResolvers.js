const { admin } = require("../../admin");
const { ApolloError } = require("apollo-server-express");

const authResolvers = {
    addCustomClaim : async (_root, args) => {
        try {
            await admin.auth().setCustomUserClaims(args.userid, { ...args.claim });
            return "Success";
        } catch (error) {
            throw new ApolloError(error.message);
        }
    }
};

module.exports = { authResolvers };
