const moment = require("moment");
const subscriptions = require("../models/subscriptions");
const packages = require("../models/package");
const user = require("../models/users");
const controllerWrapper = require("../functions/controllerWrapper");
exports.getAllSubscription = async (req) => {
  return await controllerWrapper({
    getAllSubscription: subscriptions.find({}, {}),
  });
};
exports.getSingleSubscription = async (req) => {
  return await controllerWrapper({
    getSingleSubscription: subscriptions.findOne({ _id: req.params.id }),
  });
};
exports.getSingleUserSubscriptions = async () => {
  return await controllerWrapper({
    getSingleUserSubscriptions: subscriptions.find({
      userID: req.user.user_id,
    }),
    message: "Packages Subscribed by Single user",
  });
};
exports.subscribeNeuroSpeechPackage = async (req) => {
  return new Promise(async (resolve, reject) => {
    packages
      .findOneAndUpdate(
        {
          name: req.body.moduleName,
          "neuroSpeech._id": req.body.packageId,
        },
        {
          $push: {
            "neuroSpeech.$[v].subscribedBy": req.user.user_id,
          },
        },
        {
          arrayFilters: [{ "v._id": req.body.packageId }],
          new: true,
        }
      )
      .then(async (res) => {
        console.log("res......", res);
        const output = res.neuroSpeech.find(
          (obj) => obj.id === req.body.packageId
        );
        console.log("output.......", output);
        const newSubscription = new subscriptions({
          moduleName: res.moduleName, // Neuro Speech  Here Module Name is static
          packageName: output.displayName, // Freeminum
          wordsPerDay: output.wordsPerDay || "",
          wordsPerWeek: output.wordsPerWeek || "",
          wordsPerMonth: output[req.body.packageName].wordsPerMonth || "",
          cost: output[req.body.packageName].cost,
          packageType: output.packageType,
          purchasedDate: Date.now(),
          expiryDate: moment(Date.now()).add(
            output[req.body.packageName].expiryLimit,
            "days"
          ),
          totalWords: output[req.body.packageName].totalWords,
          userID: req.user.user_id,
          packageRef: output._id,
          voices: [...output.voices],
        });

        const newData = await newSubscription.save();
        const updateUser = await user.findByIdAndUpdate(
          req.user.user_id,
          {
            $push: {
              subscriptions: newData._id,
            },
          },
          { new: true }
        );
        resolve({
          code: 200,
          data: newData,
        });
      });
  }).catch((err) =>
    reject({
      code: 400,
      error: err,
    })
  );
};
exports.subscribeNeuroPostPackage = async (req) => {
  return new Promise(async (resolve, reject) => {
    packages
      .findOneAndUpdate(
        {
          name: req.body.moduleName,
          "neuroPost._id": req.body.packageId,
        },
        {
          $push: {
            "neuroPost.$[v].subscribedBy": req.user.user_id,
          },
        },
        {
          arrayFilters: [{ "v._id": req.body.packageId }],
          new: true,
        }
      )
      .then(async (res) => {
        console.log("res...", res);
        const output = res.neuroPost.find(
          (obj) => obj.id === req.body.packageId
        );
        console.log("output.....", output);
        const newSubscription = new subscriptions({
          moduleName: res.moduleName, // Neuro Speech  Here Module Name is statis
          packageName: output.displayName, // Freeminum
          wordsPerDay: output.wordsPerDay || "",
          wordsPerWeek: output.wordsPerWeek || "",
          wordsPerMonth: output.wordsPerMonth || "",
          costPaid: "100$",
          packageType: output.packageType,
          purchasedDate: Date.now(),
          expiryDate: "",
          totalWords: output.totalWords,
          userID: req.user.user_id,
          packageRef: output._id,
          voices: [...output.voices],
        });

        const newData = await newSubscription.save();
        const updateUser = await user.findByIdAndUpdate(
          req.user.user_id,
          {
            $push: {
              subscriptions: newData._id,
            },
          },
          { new: true }
        );
        resolve({
          code: 200,
          data: updateUser,
        });
      });
  }).catch((err) =>
    reject({
      code: 400,
      error: err,
    })
  );
};
exports.refundSubscription = async (req) => {
  return await controllerWrapper({
    refundSubscription: subscriptions.findByIdAndUpdate(),
  });
};
