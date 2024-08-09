const mongoose = require("mongoose");
const {
  Schema,
  Schema: {
    Types: { ObjectId },
  },
  model,
} = mongoose;
const subscription = Schema(
  {
    moduleName: {
      type: String,
      required: true,
    }, // Neuro Speech  Here Module Name is statis

    wordsPerWeek: {
      type: Number,
    }, // should be 150 * 7 = 1050 words

    remainingWords: {
      type: Number,
    }, // 1000
    packageName: {
      type: String,
      required: true, // display name of package
    }, // Freeminum
    packageType: {
      type: String,
    }, // monthly , biAnnual , Annual
    voices: [
      {
        type: String,
      },
    ],
    // package details
    totalWords: {
      type: String,
    },
    wordsPerMonth: {
      type: String,
    }, // should be 150 * 30/31 = 4500 words
    cost: {
      type: String,
      required: true,
    }, // $10
    expiryLimit: {
      type: String,
    },
    // package details
    purchasedDate: {
      type: Date,
      default: Date.now(),
    }, // 13/11/23
    expiryDate: {
      type: Date,
      default: Date.now(),
    }, // 13/12/22
    userID: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    packageRef: {
      type: ObjectId,
      ref: "package", // from packages collection
      required: true,
    },
    subPackageRef: {
      type: ObjectId,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const subscritionModel = model("subscription", subscription);
module.exports = subscritionModel;
