const { VoiceId } = require("@aws-sdk/client-polly");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;
const package = Schema({
  moduleName: {
    type: String,
  },
  neuroSpeech: [
    {
      displayName: {
        // pro / basic /As You Go
        type: String,
        required: true,
      },
      packageType: {
        type: String,
        default: "prepaired", // prepaired for pacakge and postpaid for Pay As You Go
      },
      enable: {
        type: Boolean,
        default: true,
      },
      // wordsPerMonth: {
      //   type: String, //15000
      //   required: true,
      // },
      voices: [
        {
          type: String,
        },
      ],
      // cost: {
      //   type: String,
      //   required: true,
      // },
      // expiryDays: {
      //   type: String,
      //   required: true,
      // },
      // totalWords: {
      //   type: String,
      //   required: true,
      // },
      // isActivated: {
      //   type: Boolean,
      //   default: true,
      // },
      subscribedBy: [{ type: ObjectId, ref: "user", default: [] }],
      isDeleted: {
        type: Boolean,
        default: false,
      },

      monthly: {
        enable: {
          type: Boolean,
        },
        totalWords: {
          type: String,
        },
        wordsPerMonth: {
          type: String,
        },
        cost: {
          type: String,
        },
        expiryLimit: {
          type: String,
        },
      },

      biAnnual: {
        enable: {
          type: Boolean,
        },
        totalWords: {
          type: String,
        },
        wordsPerMonth: {
          type: String,
        },
        cost: {
          type: String,
        },
        expiryLimit: {
          type: String,
        },
      },
      lifeTime: {
        enable: {
          type: Boolean,
        },
        totalWords: {
          type: String,
        },
        wordsPerMonth: {
          type: String,
        },
        cost: {
          type: String,
        },
        expiryLimit: {
          type: String,
        },
      },
      custom: {
        enable: {
          type: Boolean,
        },
        totalWords: {
          type: String,
        },
        wordsPerMonth: {
          type: String,
        },
        cost: {
          type: String,
        },
        expiryLimit: {
          type: String,
        },
      },
    },
  ],
  neuroPost: [
    {
      displayName: {
        // pro / basic /As You Go
        type: String,
        required: true,
      },
      packageType: {
        type: String,
        default: "prepaired", // prepaired for pacakge and postpaid for Pay As You Go
      },
      wordsPerMonth: {
        type: String, //15000
        required: true,
      },
      voices: [{ type: String }],
      cost: {
        type: String,
        required: true,
      },
      expiryDays: {
        type: String,
        required: true,
      },
      totalWords: {
        type: String,
        required: true,
      },
      isActivated: {
        type: Boolean,
        default: true,
      },
      subscribedBy: [{ type: ObjectId, ref: "user", default: [] }],
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
});
const packageModel = mongoose.model("package", package);
module.exports = packageModel;
