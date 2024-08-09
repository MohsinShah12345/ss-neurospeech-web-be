const express = require("express");
const auth = require("../middleware/auth");
const user = require("../Services/User");
const subscription = require("../Services/subscription");
const project = require("../Services/projects");
const package = require("../Services/package");
const voice = require("../Services/voices");
const voiceOver = require("../Services/voiceOver");

const ServiceRouter = express.Router();

ServiceRouter.use("/user", user);
ServiceRouter.use("/subscription", subscription); // packages subscribed by users
ServiceRouter.use("/project", project);
ServiceRouter.use("/package", package);
ServiceRouter.use("/voice", voice);
ServiceRouter.use("/voiceOver", voiceOver);

module.exports = ServiceRouter;
