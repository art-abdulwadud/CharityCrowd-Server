const projectTypes = `
    type Donation {
        name: String!
        amount: String!
        timestamp: String!
    }
    type Oragnizer {
        name: String!
        type: String!
        location: String!
        email: String
    }
    type Project {
        id: ID!
        name: String!
        requiredAmount: Float!
        currentAmount: Float!
        timestamp: String!
        firstDonation: Donation
        topDonation: Donation
        lastDonation: Donation
        description: String!
        organizer: Organizer
        beneficiary: Organizer
        numberOfDonations: Int!
    }
`;

const projectQueries = `
    type Query {
        addAProject(userid: String!): String!
    }
`;

module.exports = { projectTypes, projectQueries };
