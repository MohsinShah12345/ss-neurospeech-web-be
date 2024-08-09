const voice = require("../models/voice");
const controllerWrapper = require("../functions/controllerWrapper");
const awsFunction = require("../aws/polly");
const azureFunction = require("../azure/textToSpeech");
const readData = require("../functions/readDataFromFile");
exports.getSingleVoice = async (req) => {
  return await controllerWrapper({
    getSingleVoice: voice.findById(req.params.voiceId),
    message: "Voice has been fetched Successfully",
  });
};
exports.getMultipleVoice = async (req) => {
  return await controllerWrapper({
    getMultipleVoice: voice.find({
      _id: { $in: [...JSON.parse(req.params.voicesIds)] },
    }),
    message: "Voices has been fetched successfully",
  });
};
exports.azureVoices = async (req) => {
  try {
    const data = await require("../functions/readDataFromFile")(
      "utils/availableVoice/azureVoices.json"
    );

    return JSON.parse(data) || {};
  } catch (error) {
    return error;
  }
};
exports.getAllVoices = async (req) => {
  try {
    const data = await voice.find({});
    return data;
  } catch (error) {
    return error;
  }
};
exports.fetchAwsVoices = async (req) => {
  const { data } = await awsFunction.fetchAwsVoices(req);
  await voice.insertMany([...data.Voices]);
  return data.Voices;
};
exports.fetchAllAzureVoices = async (req) => {
  const data = await azureFunction.getVoicesList();
  return data;
};
exports.addVoice = async (req) => {
  const newVoice = new voice({
    ...req.body.voice,
    createdBy: req.user.user_id,
  });
  return await controllerWrapper({
    addVoice: newVoice.save(),
    message: "New Voice has been Added",
  });
};
exports.addMultipleVoices = async (req) => {
  return await controllerWrapper({
    addMultipleVoices: voice.insertMany([...req.body.voices]),
    message: "Voices has been Added Successfully",
  });
};
exports.updateSingleVoice = async (req) => {
  return await controllerWrapper({
    updateSingleVoice: voice.findByIdAndUpdate(
      req.body.voiceId,
      { ...req.body.voice },
      { new: true }
    ),
    message: "",
  });
};
exports.updateMultipleVoices = async (req) => {
  return await controllerWrapper({
    updateMultipleVoices: "",
    message: "",
  });
}; // Pending
exports.deleteSingleVoice = async (req) => {
  return await controllerWrapper({
    deleteSingleVoice: voice.findOneAndDelete({ _id: req.params.voiceId }),
  });
};
exports.deleteMultiple = async (req) => {
  const query = {
    _id: {
      $in: [...JSON.parse(req.params.voicesIds)], // delete all documents if any documnet id matches from given voicesIds array
    },
  };
  return await controllerWrapper({
    deleteMultiple: voice.deleteMany(query),
    message: "Voices has been deleted",
  });
};
