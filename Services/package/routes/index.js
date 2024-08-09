const { ResultWithContext } = require("express-validator/src/chain");
const packages = require("../../../controllers/packages");
exports.getSingleNeuroSpeechPackage = async (req, res) => {
  try {
    const data = await packages.getSingleNeuroSpeechPackage(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getSingleNeuroSpeechPackageSubscribedBy = async (req, res) => {
  try {
    const data = await packages.getSingleNeuroSpeechPackageSubscribedBy(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getSingleNeuroPostPackage = async (req, res) => {
  try {
    const data = await packages.getSingleNeuroPostPackage(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getNeuroPost = async (req, res) => {
  try {
    const data = await packages.getNeuroPost(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getNeuroSpeech = async (req, res) => {
  try {
    const data = await packages.getNeuroSpeech(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.addNeuroSpeechPackage = async (req, res) => {
  try {
    const data = await packages.addNeuroSpeechPackage(req);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.addNeuroPostPackage = async (req, res) => {
  try {
    console.log("Req.body....", req.body);
    const data = await packages.addNeuroPostPackage(req);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.addCustomNeuroSpeechPackage = async (req, res) => {
  try {
    console.log("addCustomNeuroSpeechPackage", req.body);

    const data = await packages.addCustomNeuroSpeechPackage(req);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.updateNeuroSpeechPackage = async (req, res) => {
  try {
    const data = await packages.updateNeuroSpeechPackage(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.updateNeuroPostPackage = async (req, res) => {
  try {
    const data = await packages.updateNeuroPostPackage(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteNeuroSpeechPackage = async (req, res) => {
  try {
    const data = await packages.deleteNeuroSpeechPackage(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(400);
  }
};
exports.deleteNeuroPostPackage = async (req) => {
  try {
    const data = await packages.deleteNeuroPostPackage(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
