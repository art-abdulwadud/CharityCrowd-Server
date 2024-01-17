/* eslint-disable use-isnan */
// const { db } = require("../admin");
const { authResolvers } = require("./resolvers/authResolvers");
const { donationResolvers } = require("./resolvers/donationResolvers");
const { projectResolvers, projectMutationResolvers } = require("./resolvers/projectResolvers");
const { userQueryResolvers, userMutationResolvers } = require("./resolvers/userResolvers");

const resolvers = {
    // Scalars

    // Queries
    Query: {
        ...userQueryResolvers,
        ...projectResolvers,
        ...donationResolvers
    },
    // Mutations
    Mutation: {
        ...userMutationResolvers,
        ...authResolvers,
        ...projectMutationResolvers
    }
};

module.exports = resolvers;
