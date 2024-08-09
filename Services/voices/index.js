const express = require("express");
const serviceRouter = express.Router();
const auth = require("../../middleware/auth");
const voices = require("./routes");

serviceRouter.get("/getSingleVoice/:voiceId", auth, voices.getSingleVoice);
serviceRouter.get(
  "/getMultipleVoice/:voicesIds",
  auth,
  voices.getMultipleVoice
);
serviceRouter.get("/azureVoices", voices.azureVoices);
serviceRouter.get("/getAllVoices", auth, voices.getAllVoices);
serviceRouter.get("/fetchAwsVoices/:languageCode", auth, voices.fetchAwsVoices);
// serviceRouter.get("/fetchAllAzureVoices", voices.fetchAllAzureVoices); //will remain commented until we don't fetch voices from azure
serviceRouter.post("/addVoice", auth, voices.addVoice);
serviceRouter.post("/addMultipleVoices", auth, voices.addMultipleVoices);
serviceRouter.patch("/updateSingleVoice", auth, voices.updateSingleVoice);
serviceRouter.patch("/updateMultipleVoices", auth, voices.updateMultipleVoices);
serviceRouter.delete(
  "/deleteSingleVoice/:voiceId",
  auth,
  voices.deleteSingleVoice
);
serviceRouter.delete("/deleteMultiple/:voicesIds", auth, voices.deleteMultiple);

module.exports = serviceRouter;
