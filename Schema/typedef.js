const { gql } = require("apollo-server-express");
const { authQueries } = require("./defs/auth");
const { donationQueries, donationTypes } = require("./defs/donations");
const { projectTypes, projectQueries } = require("./defs/projects");
const { userTypes, userQueries } = require("./defs/users");

const typeDefs = gql`
    ${userTypes}
    ${projectTypes}
    ${donationTypes}

    ${userQueries}
    ${authQueries}
    ${projectQueries}
    ${donationQueries}
`;

module.exports = typeDefs;
