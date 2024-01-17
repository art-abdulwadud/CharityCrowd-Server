const donationTypes = `
    type Donation {
        _id: ID!
        userId: String!
        projectId: String!
        amountDonated: Float!
        modeOfPayment: String!
        createdAt: String
        updatedAt: String
        anonymous: Boolean
    }

    input PaymentInput {
        cardNumber: String
        nameOnCard: String
        expiryDate: String
        cvv: String
    }
    input DonationInput {
        userId: String!
        amountToDonate: Float!,
        modeOfPayment: String!,
        payment: PaymentInput!,
        anonymous: Boolean!
        subscribed: Boolean!
        projectId: String!
    }
`;

const donationQueries = `
    type Query {
        getDonationsByProjectId(projectid: String!): [Donation]!
    }

    type Query {
        getDonationsByUserId(userid: String!): [Donation]!
    }

    type Query {
        getDonationsByProjectUserId(projectid: String!, userid: String!): [Donation]!
    }

    type Mutation {
        addDonation(donation: DonationInput!): Donation!
    }
`;

module.exports = { donationTypes, donationQueries };
