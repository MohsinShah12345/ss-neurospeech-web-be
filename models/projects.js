const mongoose = require("mongoose");

const {
  Schema,
  Schema: {
    Types: { ObjectId },
  },
  model,
} = mongoose;
const project = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    voices_created: [
      {
        type: ObjectId,
        ref: "voices",
      },
    ],
    user_id: {
      type: ObjectId,
      ref: "user", // name of model we are using
    },
  },
  {
    timestamps: true,
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);
const projectModel = model("project", project);
module.exports = projectModel;
