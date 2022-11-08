const donationTypes = `
    type Payment {
        cardNumber: String
        nameOnCard: String
        expiryDate: String
        cvv: String
    }
    type Donation {
        _id: ID!
        name: String!
        userId: String!
        amountDonated: Number
        createdAt: String
        updatedAt: String
    }
`;

const donationQueries = `
    input Donation {
        name: String!
        userId: String!
        amountDonated: Number!
    }
    type Query {
        addDonation(donation: Donation!): Donation!
    }
`;

module.exports = { donationTypes, donationQueries };
