const { ApolloError } = require("apollo-server-express");
const Project = require("../../Models/projectModel");

const projectResolvers = {
    getAllProjects: async () => {
        try {
            const projectList = await Project.find().sort({ createdAt: -1 });
            return projectList;
        } catch (error) {
            return new ApolloError(error.message);
        }
    },
    getProjectById: async (_root, args) => {
        try {
            const requestedProject = await Project.findById(args.projectid);
            return requestedProject;
        } catch (error) {
            return new ApolloError(error.message);
        }
    } 
};

const projectMutationResolvers = {
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
            return new ApolloError(error.message);
        }
    },
    editProject : async (_root, args) => {
        try {
            const { project, currentUser } = args;
            if (currentUser !== project.userId) return new ApolloError("Insuficient permissions");
            const projectDoc = await Project.findById(project.id);
            Object.assign(projectDoc, project);
            await projectDoc.save();
            return projectDoc;
        } catch (error) {
            return new ApolloError(error.message);
        }
    }
};

module.exports = { projectResolvers, projectMutationResolvers };
