/* eslint-disable use-isnan */
// const { db } = require("../admin");
const { authResolvers } = require("./resolvers/authResolvers");
const { donationResolvers } = require("./resolvers/donationResolvers");
const { projectResolvers } = require("./resolvers/projectResolvers");
const { userQueryResolvers, userMutationResolvers } = require("./resolvers/userResolvers");

const resolvers = {
    // Scalars

    // Queries
    Query: {
        ...userQueryResolvers,
        ...authResolvers,
        ...projectResolvers,
        ...donationResolvers
    },
    // Mutations
    Mutation: {
        ...userMutationResolvers
    }
};

module.exports = resolvers;
