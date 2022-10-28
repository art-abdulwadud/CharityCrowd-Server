const fs = require("fs");
const path = require("path");
const { admin } = require("../../admin");
const { ApolloError } = require("apollo-server-express");
const Project = require("../../Models/projectModel");

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
                const projectDoc = new Project({
                    ...project, 
                    currentAmount: 0, 
                    numberOfDonations: 0 
                });
                await projectDoc.save();
                return projectDoc;
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
    },
    getProjectById: async (_root, args) => {
        try {
            let requestedProject = {};
            projects.forEach((key) => key.id === args.projectid ? requestedProject = key : null);
            return requestedProject;
        } catch (error) {
            throw new ApolloError(error.message);
        }
    } 
};

module.exports = { projectResolvers };
