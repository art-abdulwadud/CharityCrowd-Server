const userTypes = `
    type User {
        id: ID
        name: String!
        email: String!
        admin: Boolean
        owner: Boolean
        staff: Boolean
        userId: String
    }
`;

const userQueries = `
    type Query {
        getUserProfile(userid: String!): User!
    }
    
    type Query {
        signUpUser(user: UserDetails!): User!
    }
`;

module.exports = { userTypes, userQueries };
