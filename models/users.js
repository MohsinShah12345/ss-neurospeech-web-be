const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  Schema,
  Schema: {
    Types: { ObjectId },
  },
  model,
} = mongoose;
const userSchema = Schema(
  {
    firstName: {
      type: String,
      default: "",
      // required:true,
    },
    lastName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: null,
    },
    photo: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "client",
    },
    subscriptions: [
      {
        type: ObjectId,
        ref: "subscription",
      },
    ],
    lastLoginDate: {
      type: Date,
    },
    userPaymentMethods: [{}],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // password encription
    next();
  }
}); // this will work every time when we save/update data in mongodb
const userModel = model("user", userSchema);

module.exports = userModel;
