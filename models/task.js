const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const taskSchema = new Schema(
  {
    taskId: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: "user",
    },
    projectId: {
      type: ObjectId,
      ref: "project",
    },
    socketId: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const task = model("task", taskSchema);
module.exports = task;
