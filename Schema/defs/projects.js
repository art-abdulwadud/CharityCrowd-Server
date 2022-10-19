const projectTypes = `
    type Donation {
        name: String!
        amount: String!
        timestamp: String!
    }
    type Organizer {
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
    input OrganizerInput {
        name: String!
        type: String!
        location: String
        email: String
    }
    input ProjectInput {
        name: String!
        description: String!
        requiredAmount: Float!
        organizer: OrganizerInput
        beneficiary: OrganizerInput
    }
    type Query {
        addAProject(currentUser: String!, project: ProjectInput!): Project!
    }
`;

module.exports = { projectTypes, projectQueries };
