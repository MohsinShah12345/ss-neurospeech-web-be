const projects = require("../models/projects");
const controllerWrapper = require("../functions/controllerWrapper");
exports.fetchSingleProject = async (req) => {
  return await controllerWrapper({
    fetchSingleProject: projects.findById(req.params.id),
    message: "Project has been fetched successfully",
  });
};
exports.fetchProjects = async (req) => {
  return await controllerWrapper({
    fetchProjects: projects.find({}),
    message: "Projects has been fetched successfully",
  });
};
exports.createProject = async (req) => {
  const newProject = new projects({ ...req.body, user_id: req.user.user_id });
  return await controllerWrapper({
    createProject: newProject.save(),
    message: "New Project has been created",
  });
};
exports.updateProject = async (req) => {
  return await controllerWrapper({
    updateProject: "",
    message: "Project has been created successfully",
  });
};
exports.deleteProject = async (req) => {
  return await controllerWrapper({
    deleteProject: "",
    message: "Project has been deleted Successfully",
  });
};
