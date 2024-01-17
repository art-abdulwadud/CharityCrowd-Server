const authQueries = `
    type Error {
        message: String!
    }

    input Obj {
        admin: Boolean
        owner: Boolean
        member: Boolean
    }

    type Mutation {
        addCustomClaim(currentUser: String!, userid: ID!, claim: Obj!): String
    }
`;

module.exports = { authQueries };