/* eslint-disable use-isnan */
// const { db } = require("../admin");
const { userResolvers } = require("./resolvers/userResolvers");

const resolvers = {
    // Scalars

    // Queries
    Query: {
        ...userResolvers
    },

    // Mutations
};

module.exports = resolvers;
