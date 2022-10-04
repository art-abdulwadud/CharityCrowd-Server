const fs = require("fs");
const path = require("path");
const { admin } = require("../../admin");

let users = [];
const usersDBPath = path.resolve("./Schema/data/users.json");
fs.readFile(usersDBPath, "utf8", (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    users = JSON.parse(jsonString);
});

const resolvers = {
    // Scalars

    // Queries
    Query: {
        getUserProfile : async (_root, args) => {
            try {
                let currentUser = {};
                users.forEach((user) => user.id === args.userid ? currentUser = user : null);
                const fetchedUser = await admin.auth().getUserByEmail(currentUser.email);
                if (fetchedUser.customClaims && fetchedUser.customClaims.admin === true) currentUser = { ...currentUser, admin: true };
                if (fetchedUser.customClaims && fetchedUser.customClaims.owner === true) currentUser = { ...currentUser, owner: true };
                if (fetchedUser.customClaims && fetchedUser.customClaims.staff === true) currentUser = { ...currentUser, staff: true };
                return currentUser;
            } catch (error) {
                console.log(error.message);
            }
        },
        signUpUser : async (_root, args) => {
            try {
                const { user } = args;
                users = [...users, user];
                fs.writeFile(usersDBPath, JSON.stringify(users), (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("New user registered");
                });
                return user;
            } catch (error) {
                return error.message;
            }
        }
    },

    // Mutations
};

module.exports = resolvers;
