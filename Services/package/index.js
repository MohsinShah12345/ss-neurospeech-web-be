const express = require("express");
const package = require("./routes");
const auth = require("../../middleware/auth");
const serviceRouter = express.Router();

serviceRouter.get(
  "/getSingleNeuroSpeechPackage/:packageId",
  auth,
  package.getSingleNeuroSpeechPackage
);
serviceRouter.get(
  "/getSingleNeuroSpeechPackageSubscribedBy/:packageId/:pageNo",
  auth,
  package.getSingleNeuroSpeechPackageSubscribedBy
);
serviceRouter.get(
  "/getSingleNeuroPostPackage/:packageId",
  auth,
  package.getSingleNeuroPostPackage
);
serviceRouter.get("/getNeuroPostPackages", auth, package.getNeuroPost);
serviceRouter.get("/getNeuroSpeechPackages", auth, package.getNeuroSpeech);
serviceRouter.post(
  "/addNeuroSpeechPackage",
  auth,
  package.addNeuroSpeechPackage
);
serviceRouter.post("/addNeuroSpeechPackage", auth, package.addNeuroPostPackage);
serviceRouter.post(
  "/addCustomNeuroSpeechPackage",
  auth,
  package.addCustomNeuroSpeechPackage
);
serviceRouter.patch(
  "/updateNeuroSpeechPackage",
  package.updateNeuroSpeechPackage
);
serviceRouter.patch(
  "/updateNeuroPostPackage",
  auth,
  package.updateNeuroPostPackage
);
serviceRouter.delete(
  "/deleteNeuroSpeechPackage/:packageId",
  auth,
  package.deleteNeuroSpeechPackage
);
serviceRouter.delete(
  "/deleteNeuroPostPackage/:packageId",
  auth,
  package.deleteNeuroPostPackage
);
module.exports = serviceRouter;
