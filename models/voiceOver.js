const { Schema, model } = require("mongoose");
const {
  Types: { ObjectId },
} = Schema;
const voiceOver = Schema(
  {
    userId: {
      type: ObjectId,
      ref: "user",
    },
    projects: [
      {
        projectName: {
          type: String,
          required: true,
        },
        voiceOversList: [
          {
            text: {
              type: String,
            },
            engine: {
              type: String,
            },
            languageCode: {
              type: String,
            },
            lexiconNames: {
              type: String,
            },
            outputFormat: {
              type: String,
            },
            outputUri: {
              type: String,
            },
            requestCharacters: {
              type: String,
            },
            sampleRate: {
              type: String,
            },
            snsTopicArn: {
              type: String,
            },
            speechMarkTypes: {
              type: String,
            },
            taskId: {
              type: String,
            },
            taskStatus: {
              type: String,
            },
            taskStatusReason: {
              type: String,
            },
            textType: {
              type: String,
            },
            voiceId: {
              type: String,
            },
            languageName: {
              type: String,
            },
            date: {
              type: Date,
              default: Date.now(),
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const voiceOverModel = model("voiceOver", voiceOver);
module.exports = voiceOverModel;
