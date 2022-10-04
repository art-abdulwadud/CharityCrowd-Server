const { gql } = require("apollo-server-express");

const typeDefs = gql`
    # Scalars

    # Types

    type ProcessingStore {
        status: Boolean
        requestId: String
    }
    type User {
        id: ID
        name: String!
        email: String!
        admin: Boolean
        owner: Boolean
        staff: Boolean
        userId: String
    }

    # Queries

    type Query {
        getUserProfile(userid: String!): User!
    }

    type Query {
        signUpUser(user: UserDetails!): User!
    }

    # Mutations
`;

module.exports = typeDefs;
