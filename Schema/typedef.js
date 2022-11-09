const { gql } = require("apollo-server-express");
const { authQueries } = require("./defs/auth");
const { donationQueries, donationTypes } = require("./defs/donations");
const { projectTypes, projectQueries } = require("./defs/projects");
const { userTypes, userQueries } = require("./defs/users");

const typeDefs = gql`
    # Scalars

    # Types
    ${userTypes}
    ${projectTypes}
    ${donationTypes}

    # Queries
    ${userQueries}
    ${authQueries}
    ${projectQueries}
    ${donationQueries}

    # Mutations
`;

module.exports = typeDefs;
