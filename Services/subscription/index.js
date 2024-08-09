const express = require("express");
const subscriptions = require("./routes/index");
const auth = require("../../middleware/auth");
const serviceRouter = express.Router();

serviceRouter.get(
  "/getAllSubscription",
  auth,
  subscriptions.getAllSubscription
);
serviceRouter.get(
  "/getSingleSubscription/:subscriptionId",
  auth,
  subscriptions.getSingleSubscription
);
serviceRouter.get(
  "/getSingleUserSubscriptions",
  auth,
  subscriptions.getSingleUserSubscriptions
),
  serviceRouter.post(
    "/subscribeNeuroSpeechPackage",
    auth,
    subscriptions.subscribeNeuroSpeechPackage
  );
serviceRouter.post(
  "/subscribeNeuroPostPackage",
  auth,
  subscriptions.subscribeNeuroPostPackage
);
serviceRouter.delete(
  "/refundSubscription/:id",
  auth,
  subscriptions.refundSubscription
);

module.exports = serviceRouter;
