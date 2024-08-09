const projects = require("../../../controllers/projects");
exports.fetchSingleProject = async (req, res) => {
  try {
    const data = await projects.fetchSingleProject(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.fetchProjects = async (req, res) => {
  try {
    const data = await projects.fetchProjects(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.createProject = async (req, res) => {
  try {
    const data = await projects.createProject(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.updateProject = async (req, res) => {
  try {
    const data = await projects.updateProject;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.deleteProject = async (req, res) => {
  try {
    const data = await projects.deleteProject;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
