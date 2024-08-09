const voices = require("../../../controllers/voices");
const { refundSubscription } = require("../../subscription/routes");
exports.getSingleVoice = async (req, res) => {
  try {
    const data = await voices.getSingleVoice(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getMultipleVoice = async (req, res) => {
  try {
    const data = await voices.getMultipleVoice(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.azureVoices = async (req, res) => {
  try {
    const data = await voices.azureVoices(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getAllVoices = async (req, res) => {
  try {
    const data = await voices.getAllVoices(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.fetchAwsVoices = async (req, res) => {
  try {
    const data = await voices.fetchAwsVoices(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.fetchAllAzureVoices = async (req, res) => {
  try {
    const data = await voices.fetchAllAzureVoices(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.addVoice = async (req, res) => {
  try {
    const data = await voices.addVoice(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.addMultipleVoices = async (req, res) => {
  try {
    const data = await voices.addMultipleVoices(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.updateSingleVoice = async (req, res) => {
  try {
    const data = await voices.updateSingleVoice(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.updateMultipleVoices = async (req, res) => {
  try {
    const data = await voices.updateMultipleVoices(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.deleteSingleVoice = async (req, res) => {
  try {
    const data = await voices.deleteSingleVoice(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.deleteMultiple = async (req, res) => {
  try {
    const data = await voices.deleteMultiple(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
