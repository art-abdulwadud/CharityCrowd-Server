const projectTypes = `
    type DonationType {
        userId: String
        amount: String
        timestamp: String
        anonymous: Boolean
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
        userId: String!
    }

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
        userId: String
        id: String
    }
`;

const projectQueries = `
    type Query {
        getAllProjects: [Project]!
    }

    type Query {
        getProjectById(projectid: ID!): Project!
    }

    type Mutation {
        addAProject(currentUser: String!, project: ProjectInput!): Project!
    }
    
    type Mutation {
        editProject(currentUser: String!, project: ProjectInput!): Project!
    }
`;

module.exports = { projectTypes, projectQueries };
