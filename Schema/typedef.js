const { gql } = require("apollo-server-express");
const { userTypes, userQueries } = require("./defs/users");

const typeDefs = gql`
    # Scalars

    # Types
    ${userTypes}

    # Queries
    ${userQueries}

    # Mutations
`;

module.exports = typeDefs;
