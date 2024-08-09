const express = require("express");
const serviceRouter = express.Router();
const auth = require("../../middleware/auth");
const voiceOver = require("./routes");
serviceRouter.get(
  "/getSingleProject/:projectId",
  auth,
  voiceOver.getSingleProject
);
serviceRouter.get("/getUserProjects", auth, voiceOver.getUserProjects);
serviceRouter.get("/getAllProjects", auth, voiceOver.getAllProjects);
serviceRouter.post("/createProject", auth, voiceOver.createProject);
serviceRouter.post("/createVoiceOver", auth, voiceOver.createVoiceOver);
serviceRouter.post(
  "/createAzureVoiceOver",
  auth,
  voiceOver.createAzureVoiceOver
);
serviceRouter.patch("/updateVoiceOver", auth, voiceOver.updateVoiceOver);
serviceRouter.delete("/deleteVoiceOver", auth, voiceOver.deleteVoiceOver);
serviceRouter.delete(
  "/deleteUserVoiceOvers",
  auth,
  voiceOver.deleteUserVoiceOvers
);
serviceRouter.delete(
  "/deleteMultipleVoiceOvers",
  voiceOver.deleteMultipleVoiceOvers
);
serviceRouter.delete(
  "/deleteProject/:projectId",
  auth,
  voiceOver.deleteProject
);
serviceRouter.get(
  "/getCurrentVoiceOver/:userId/:projectId/:taskId/:socketId",
  voiceOver.getCurrentVoiceOver
);

module.exports = serviceRouter;
