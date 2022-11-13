const donationTypes = `
    type Donation {
        _id: ID!
        userId: String!
        projectId: String!
        amountDonated: Float!
        modeOfPayment: String!
        createdAt: String
        updatedAt: String
    }
`;

const donationQueries = `
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
    type Query {
        addDonation(donation: DonationInput!): Donation!
    }

    type Query {
        getDonationsByProjectId(projectid: String!): [Donation]!
    }

    type Query {
        getDonationsByUserId(userid: String!): [Donation]!
    }

    type Query {
        getDonationsByProjectUserId(projectid: String!, userid: String!): [Donation]!
    }
`;

module.exports = { donationTypes, donationQueries };
