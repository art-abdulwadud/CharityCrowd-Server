const fs = require("fs");
const path = require("path");
const { admin } = require("../../admin");
const { addToServerDb } = require("../../globalFuncs");
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
                const addedProject = await addToServerDb(projectsDBPath, [projects, { 
                    ...project, 
                    currentAmount: 0, 
                    timestamp: new Date(Date.now()), 
                    numberOfDonations: 0 
                }, null, "projects"], "New Project Added", () => projects = [...projects, { 
                    ...project, 
                    currentAmount: 0, 
                    timestamp: new Date(Date.now()), 
                    numberOfDonations: 0 
                }]);
                return addedProject;
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
