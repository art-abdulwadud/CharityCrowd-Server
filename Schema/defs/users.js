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
        getUserProfile(userid: String!): User!
    }
    
    type Query {
        signUpUser(email: String!, password: String!): User!
    }

    type Query {
        getAllUsers(email: String!): [User!]!
    }

    type Role {
        admin: Boolean!
    }

    type Query {
        getUserRole(currentUser: String!, requestedUser: String!): Role!
    }
`;

module.exports = { userTypes, userQueries };
