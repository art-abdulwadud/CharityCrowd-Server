const { gql } = require("apollo-server-express");
const { authQueries } = require("./defs/auth");
const { userTypes, userQueries } = require("./defs/users");

const typeDefs = gql`
    # Scalars

    # Types
    ${userTypes}

    # Queries
    ${userQueries}
    ${authQueries}

    # Mutations
`;

module.exports = typeDefs;
