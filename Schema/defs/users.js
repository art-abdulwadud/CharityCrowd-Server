const userTypes = `
    type User {
        id: ID!
        name: String!
        email: String!
        admin: Boolean
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
        getUserRole(email: String!): Role!
    }
`;

module.exports = { userTypes, userQueries };
