const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const voice = Schema(
  {
    Gender: {
      type: String,
    },

    Id: {
      type: String,
    },
    LanguageCode: {
      type: String,
    },

    LanguageName: {
      type: String,
    },
    Name: {
      type: String,
    },
    SupportedEngines: [{ type: String }],
  },
  // {
  //   platform: {
  //     type: String, // "AWS"
  //   }, // resembler
  //   name: {
  //     type: String,
  //     reqired: true,
  //   }, //"John Smith",
  //   description: {
  //     type: String,
  //   }, //"Bold male voice of a TV actor",
  //   gender: {
  //     type: String,
  //   }, // "male"
  //   endpoint: {
  //     type: String,
  //   }, // "TBD"
  //   platformID: {
  //     type: String,
  //   }, // "",
  //   engineType: {
  //     type: String,
  //   },
  //   createdBy: {
  //     type: ObjectId, // adminId who will create voice
  //     ref: "user",
  //   },
  //   emotions: [{ type: String }],
  //   language: {
  //     type: String,
  //   }, //   "Urdu", //  English | French,
  //   cost: {
  //     type: String,
  //   }, //"$10", // This cost only used int Pay as you Go
  //   expiry_days: {
  //     type: String,
  //     default: "-1",
  //   },
  //   // "-1", // -1 means lifetime otherwise integers means days
  // },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const voiceModel = model("voice", voice);
module.exports = voiceModel;
