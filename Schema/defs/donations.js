const donationTypes = `
    type Donation {
        _id: ID!
        userId: String!
        amountDonated: Float!
        modeOfPayment: String!
        createdAt: String
        updatedAt: String
    }
`;

const donationQueries = `
    input DonationInput {
        userId: String!
        amountToDonate: Float!,
        modeOfPayment: String!,
        payment: PaymentInput!,
        anonymous: Boolean!
        subscribed: Boolean!
    }
    type Query {
        addDonation(donation: DonationInput!): Donation!
    }
`;

module.exports = { donationTypes, donationQueries };
