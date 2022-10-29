/* eslint-disable use-isnan */
// const { db } = require("../admin");
const { authResolvers } = require("./resolvers/authResolvers");
const { projectResolvers } = require("./resolvers/projectResolvers");
const { userResolvers } = require("./resolvers/userResolvers");

const resolvers = {
    // Scalars

    // Queries
    Query: {
        ...userResolvers,
        ...authResolvers,
        ...projectResolvers
    },
    // Mutations
};

module.exports = resolvers;
