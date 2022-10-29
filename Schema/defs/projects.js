const projectTypes = `
    type Donation {
        name: String
        amount: String
        timestamp: String
    }

    type Organizer {
        name: String!
        location: String!
        email: String
    }
    
    type Project {
        _id: ID!
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
        createdAt: String,
        updatedAt: String
    }
`;

const projectQueries = `
    input OrganizerInput {
        name: String!
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

    type Query {
        getAllProjects: [Project]!
    }

    type Query {
        getProjectById(projectid: ID!): Project!
    }
`;

module.exports = { projectTypes, projectQueries };
