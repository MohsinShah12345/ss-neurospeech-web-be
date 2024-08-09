const voiceOver = require("../../../controllers/voiceOvers");

exports.getSingleProject = async (req, res) => {
  try {
    const data = await voiceOver.getSingleProject(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getUserProjects = async (req, res) => {
  try {
    const data = await voiceOver.getUserProjects(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getAllProjects = async (req, res) => {
  try {
    const data = await voiceOver.getAllProjects(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.createProject = async (req, res) => {
  try {
    const data = await voiceOver.createProject(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.createVoiceOver = async (req, res) => {
  try {
    const data = await voiceOver.createVoiceOver(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.createAzureVoiceOver = async (req, res) => {
  try {
    const data = await voiceOver.createAzureVoiceOver(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.updateVoiceOver = async (req, res) => {
  try {
    const data = await voiceOver.updateVoiceOver(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.deleteVoiceOver = async (req, res) => {
  try {
    const data = await voiceOver.deleteVoiceOver(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.deleteUserVoiceOvers = async (req, res) => {
  try {
    const data = await voiceOver.deleteUserVoiceOvers(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.deleteMultipleVoiceOvers = async (req, res) => {
  try {
    const data = await voiceOver(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.deleteProject = async (req, res) => {
  try {
    const data = await voiceOver.deleteProject(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getCurrentVoiceOver = async (req, res, next) => {
  try {
    const data = await voiceOver.getCurrentVoiceOver(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
