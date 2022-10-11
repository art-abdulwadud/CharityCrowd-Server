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
        addCustomClaim(userid: ID!, claim: Obj!): String
    }
`;

module.exports = { authQueries };