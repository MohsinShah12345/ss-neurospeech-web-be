const controllerWrapper = require("../functions/controllerWrapper");
const voiceOver = require("../models/voiceOver");
const socketFunctions = require("../functions/socket/index.js");
const awsFunction = require("../aws/polly");
const azureFunction = require("../azure/textToSpeech");
var AWS = require("aws-sdk");
const {
  Types: { ObjectId },
} = require("mongoose");
exports.createVoiceOver = async (req) => {
  try {
    const data = await awsFunction.createVoiceOver(req);
    return data;
  } catch (error) {
    return error;
  }
};
exports.createAzureVoiceOver = async (req) => {
  try {
    const data = await azureFunction.createVoiceOver(req.body.data);
    console.log("DATA=====:::::", data);
    await voiceOver.findOneAndUpdate(
      {
        userId: req.user.user_id,
        projects: {
          $elemMatch: {
            _id: req.body.projectId,
          },
        },
      },
      {
        $push: {
          "projects.$[v].voiceOversList": {
            outputUri: data.filename,
          },
        },
      },
      {
        arrayFilters: [{ "v._id": req.body.packageId }],
        new: true,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};
exports.checkTaskStatus = async (req) => {
  try {
    const data = await awsFunction.checkTaskStatus(req);
    return data;
  } catch (error) {
    return error;
  }
};
exports.getSingleProject = async (req, res) => {
  const data = await voiceOver.findOne(
    {
      userId: req.user.user_id,
      "projects._id": req.params.projectId,
    },
    { _id: 0, id: 0, projects: { $elemMatch: { _id: req.params.projectId } } }
  );
  if (data) {
    return {
      data: data.projects[0],
    };
  }
};
exports.getUserProjects = async (req, res) => {
  const data = await voiceOver.findOne({
    userId: req.user.user_id,
  });
  if (data) {
    return {
      projects: data.projects,
    };
  }
};
exports.getAllProjects = async (req, res) => {
  return await controllerWrapper({
    getAllProjects: voiceOver.find({}),
    message: "All Projects fetched successfully",
  });
};
exports.createProject = async (req) => {
  return await controllerWrapper({
    createProject: voiceOver.findOneAndUpdate(
      { userId: req.user.user_id },
      {
        $push: {
          projects: {
            projectName: req.body.projectName,
          },
        },
      },
      {
        new: true,
        upsert: true,
      }
    ),
    message: "Project has been created successfully",
  });
};

exports.updateVoiceOver = async (req) => {
  console.log("Controller of updateVoiceOver");
};
exports.deleteVoiceOver = async (req) => {
  console.log("Controller of deleteVoiceOver");
};
exports.deleteUserVoiceOvers = async (req) => {
  console.log("Controller of deleteUserVoiceOvers");
};
exports.deleteMultipleVoiceOvers = async (req) => {
  console.log("Controller of deleteMultipleVoiceOvers");
};
exports.deleteProject = async (req) => {
  return await controllerWrapper({
    deleteProject: voiceOver.findOneAndUpdate(
      { userId: req.user.user_id, "projects._id": req.params.projectId },
      {
        $pull: {
          projects: {
            _id: req.params.projectId,
          },
        },
      },
      {
        new: true,
      }
    ),
    message: "Project has been deleted Successfully",
  });
};
exports.getCurrentVoiceOver = async (req) => {
  const data = await voiceOver.findOne(
    {
      userId: req.params.userId,
      "projects._id": ObjectId(req.params.projectId),
    },
    {
      projects: {
        $elemMatch: {
          _id: ObjectId(req.params.projectId),
        },
      },
    }
  ); // here we are getting project from user voices overs model/Schema/db
  const socketData = data.projects[0].voiceOversList.find(
    (_) => _.taskId === req.params.taskId
  ); // data of vocieOver to send response to client side using socket
  await socketFunctions.voiceOver({
    socketId: req.params.socketId,
    projectId: req.params.projectId,
    userId: req.params.userId,
    socketData,
  }); // socket function to send data to client side
};
