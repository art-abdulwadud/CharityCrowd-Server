const projectTypes = `
    type DonationType {
        userId: String
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
        firstDonation: DonationType
        topDonation: DonationType
        lastDonation: DonationType
        description: String!
        organizer: Organizer
        beneficiary: Organizer
        numberOfDonations: Int!
        subscribedUsers: [[String]]
        createdAt: String
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
