const express = require("express");
const Projects = require("./routes");
const auth = require("../../middleware/auth");
const ServiceRouter = express.Router();

ServiceRouter.get("/fetchSingleProject/:id", auth, Projects.fetchSingleProject);
ServiceRouter.get("/fetchProjects", auth, Projects.fetchProjects);
ServiceRouter.post("/createProject", auth, Projects.createProject);
ServiceRouter.patch("/updateProject", auth, Projects.updateProject);
ServiceRouter.delete("/deleteProject", auth, Projects.deleteProject);

module.exports = ServiceRouter;
