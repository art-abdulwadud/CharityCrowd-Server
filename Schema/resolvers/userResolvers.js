const fs = require("fs");
const path = require("path");
const { admin } = require("../../admin");
const { addToServerDb } = require("../../globalFuncs");
const { ApolloError } = require("apollo-server-express");

let users = [];
const usersDBPath = path.resolve("./Schema/data/users.json");
fs.readFile(usersDBPath, "utf8", (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    users = JSON.parse(jsonString);
});

const userResolvers = {
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
            const { email, password } = args;
            const newUser = {
                email: email,
                emailVerified: false,
                password: password,
                displayName: email.split("@")[0],
                disabled: false
            };
            const user = await admin.auth().createUser(newUser);
            const userDoc = await addToServerDb(usersDBPath, [users,{ 
                email: email, 
                name: email.split("@")[0], 
                id: user.uid 
            }, user.uid, "users"], "New user registered");
            return userDoc;
        } catch (error) {
            throw new ApolloError(error.message);
        }
    },
    getAllUsers : async (_root, args) => {
        try {
            const fetchedUser = await admin.auth().getUserByEmail(args.email);
            if (fetchedUser.customClaims && fetchedUser.customClaims.admin === true) {
                return users;
            }
            throw new ApolloError("Unauthorised request");
        } catch (error) {
            throw new ApolloError(error.message);
        }
    }
};

module.exports = { userResolvers };
