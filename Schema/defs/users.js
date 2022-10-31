const userTypes = `
    type Payment {
        cardNumber: Int
        nameOnCard: String
        expiryDate: String
        cvv: String
    }
    type User {
        _id: ID!
        name: String!
        email: String!
        admin: Boolean
        phone: String
        bio: String
        country: String
        city: String
        address: String
        payment: Payment
        createdAt: String
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

    input UserInput {
        name: String
        email: String
        admin: Boolean
        phone: String
        bio: String
        country: String
        city: String
        address: String
    }
    type Query {
        updateUserProfile(userid: ID!, updates: UserInput!): String!
    }
`;

module.exports = { userTypes, userQueries };
