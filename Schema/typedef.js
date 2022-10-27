const { gql } = require("apollo-server-express");
const { authQueries } = require("./defs/auth");
const { projectTypes, projectQueries } = require("./defs/projects");
const { userTypes, userQueries } = require("./defs/users");

const typeDefs = gql`
    # Scalars

    # Types
    ${userTypes}
    ${projectTypes}

    # Queries
    ${userQueries}
    ${authQueries}
    ${projectQueries}

    # Mutations
`;

module.exports = typeDefs;
