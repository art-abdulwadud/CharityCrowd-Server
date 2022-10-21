const fs = require("fs");
const path = require("path");
const { admin, db } = require("../../admin");
const { ApolloError } = require("apollo-server-express");

let projects = [];
const projectsDBPath = path.resolve("./Schema/data/projects.json");
fs.readFile(projectsDBPath, "utf8", (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    projects = JSON.parse(jsonString);
});

const projectResolvers = {
    addAProject : async (_root, args) => {
        try {
            const { project, currentUser } = args;
            const fetchedUser = await admin.auth().getUserByEmail(currentUser);
            if (fetchedUser.customClaims && fetchedUser.customClaims.admin === true) {
                // TODO : make all values of the project argument lowercase from frontend
                const today = new Date(Date.now());
                const newItem = await db.collection("projects").add({
                    ...project, 
                    currentAmount: 0, 
                    timestamp: today, 
                    numberOfDonations: 0 
                });
                const updatedProjects = [...projects, { 
                    id: newItem.id,
                    currentAmount: 0, 
                    timestamp: today, 
                    numberOfDonations: 0 
                }];
                projects = updatedProjects;
                fs.writeFile(projectsDBPath, JSON.stringify(updatedProjects), (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Added to server database");
                });
                return { 
                    id: newItem.id,
                    currentAmount: 0, 
                    timestamp: today, 
                    numberOfDonations: 0 
                };
            }
            return new ApolloError("Unauthorised Action");
        } catch (error) {
            throw new ApolloError(error.message);
        }
    },
    getAllProjects: async () => {
        try {
            return projects.sort((ab, dc) => new Date(dc.timestamp) - new Date(ab.timestamp));
        } catch (error) {
            throw new ApolloError(error.message);
        }
    } 
};

module.exports = { projectResolvers };
