const authQueries = `
    type Error {
        message: String!
    }

    input Obj {
        admin: Boolean
        owner: Boolean
        member: Boolean
    }

    type Query {
        addCustomClaim(currentUser: String!, userid: ID!, claim: Obj!): String
    }

    type Query {
        removeCustomClaim(currentUser: String!, userid: ID!, claim: Obj!): String
    }
`;

module.exports = { authQueries };