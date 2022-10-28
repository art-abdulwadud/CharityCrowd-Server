const userTypes = `
    type User {
        _id: ID!
        name: String!
        email: String!
        admin: Boolean,
        createdAt: String,
        updatedAt: String
    }
`;

const userQueries = `
    type Query {
        signUpUser(email: String!, password: String!): User!
    }

    type Query {
        getUserProfile(userid: String!): User!
    }

    type Role {
        admin: Boolean!
    }

    type Query {
        getUserRole(currentUser: String!, requestedUser: String!): Role!
    }

    type Query {
        getRecentUsers(email: String!): [User!]!
    }

    type Query {
        getAdminUsers(email: String!): [User!]!
    }
`;

module.exports = { userTypes, userQueries };
