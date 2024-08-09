const subscriptions = require("../../../controllers/subscriptions");

exports.getAllSubscription = async (req, res) => {
  try {
    const data = await subscriptions.getAllSubscription(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getSingleSubscription = async (req, res) => {
  try {
    const data = await subscriptions.getSingleSubscription(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getSingleUserSubscriptions = async (req, res) => {
  try {
    const data = await subscriptions.getSingleUserSubscriptions(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.subscribeNeuroSpeechPackage = async (req, res) => {
  try {
    const data = await subscriptions.subscribeNeuroSpeechPackage(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.subscribeNeuroPostPackage = async (req, res) => {
  try {
    const data = await subscriptions.subscribeNeuroPostPackage(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(data);
  }
};
exports.refundSubscription = async (req, res) => {
  try {
    const data = await subscriptions.refundSubscription(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
