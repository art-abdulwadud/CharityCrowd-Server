const { ApolloError } = require("apollo-server-express");
const Project = require("../../Models/projectModel");

const projectResolvers = {
    addAProject : async (_root, args) => {
        try {
            const { project, currentUser } = args;
            const projectDoc = new Project({
                ...project, 
                currentAmount: 0, 
                numberOfDonations: 0,
                userId: currentUser
            });
            await projectDoc.save();
            return projectDoc;
        } catch (error) {
            throw new ApolloError(error.message);
        }
    },
    getAllProjects: async () => {
        try {
            const projectList = await Project.find().sort({ createdAt: -1 });
            return projectList;
        } catch (error) {
            throw new ApolloError(error.message);
        }
    },
    getProjectById: async (_root, args) => {
        try {
            const requestedProject = await Project.findById(args.projectid);
            return requestedProject;
        } catch (error) {
            throw new ApolloError(error.message);
        }
    } 
};

module.exports = { projectResolvers };
