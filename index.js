/* eslint-disable no-undef */
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginLandingPageLocalDefault } = require("apollo-server-core");
const typeDefs = require("./Schema/typedef");
const resolvers = require("./Schema/resolvers");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "./.env" });
}

(async () => {
    const dbURI = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.DBNAME}.0hyd2qk.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(dbURI)
        .then(() => console.log("Database connected"))
        .catch((error) => console.log(error));
    app.use(cors({ origin: ["http://localhost:8000","https://charitycrowd-ke.web.app"] }));
    app.use((req, res, next) => {
    // Website you wish to allow to connect
        //http://localhost:8000
        // https://fund-project.netlify.app
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");
        // Pass to next layer of middleware
        next();
    });


    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        plugins: [
            ApolloServerPluginLandingPageLocalDefault({ embed: true })
        ]
    });
    
    await server.start();
    server.applyMiddleware({ app, path: "/", cors: true });
    app.listen(process.env.PORT, () => console.log("Server is now running on port 7000"));
})();
