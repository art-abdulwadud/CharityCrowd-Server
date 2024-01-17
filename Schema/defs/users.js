const userTypes = `
    type Payment {
        cardNumber: String
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
        anonymous: Boolean
        subscriptions: [[String]]
        createdAt: String
        updatedAt: String
    }

    input PaymentInput {
        cardNumber: String
        nameOnCard: String
        expiryDate: String
        cvv: String
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
        payment: PaymentInput
    }
`;

const userQueries = `
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

    type Mutation {
        signUpUser(email: String!, password: String!): User!
    }

    type Mutation {
        updateUserProfile(userid: ID!, updates: UserInput!): String!
    }
`;

module.exports = { userTypes, userQueries };
