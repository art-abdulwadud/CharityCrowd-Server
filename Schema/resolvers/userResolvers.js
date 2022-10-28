const fs = require("fs");
const path = require("path");
const { admin } = require("../../admin");
const { ApolloError } = require("apollo-server-express");
const User = require("../../Models/userModel");

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
            
            const usersDoc = await User.findOne({"userId" : {$regex : "4H"}});
            console.log(usersDoc);
            
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
            const newUserObj = {
                email: email,
                emailVerified: false,
                password: password,
                displayName: email.split("@")[0],
                disabled: false
            };
            const user = await admin.auth().createUser(newUserObj);
            const userDoc = new User({
                _id: user.uid,
                email: email, 
                name: email.split("@")[0]
            });
            await userDoc.save();
            return userDoc;
        } catch (error) {
            throw new ApolloError(error.message);
        }
    },
    getAllUsers : async (_root, args) => {
        try {
            const fetchedUser = await admin.auth().getUserByEmail(args.email);
            if (fetchedUser.customClaims && fetchedUser.customClaims.admin === true) {
                const userList = await User.find();
                return userList;
            }
            throw new ApolloError("Unauthorised request");
        } catch (error) {
            throw new ApolloError(error.message);
        }
    },
    getUserRole : async (_root, args) => {
        try {
            const currentUser = await admin.auth().getUserByEmail(args.currentUser);
            if (currentUser.customClaims && currentUser.customClaims.admin === true) {
                let results = { admin: false };
                const requestedUser = await admin.auth().getUserByEmail(args.requestedUser);
                if (requestedUser.customClaims && requestedUser.customClaims.admin === true) results = { admin: true };
                return results;
            }
            throw new ApolloError("Unauthorised request");
        } catch (error) {
            throw new ApolloError(error.message);
        }
    }
};

module.exports = { userResolvers };
