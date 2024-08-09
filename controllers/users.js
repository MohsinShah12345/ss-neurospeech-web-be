const mongoose = require("mongoose");
const userModel = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const utils = require("./utils");
var AWS = require("aws-sdk");

const controllerWrapper = require("../functions/controllerWrapper");
const { body, validationResult } = require("express-validator");
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
exports.getUsers = async (req) => {
  return await controllerWrapper({
    getUsers: userModel.find({ role: { $ne: "admin" } }, { password: 0 }),
    message: "Users has been Fetched Successfully",
  });
};
exports.loginIn = async (req) => {
  return new Promise(function (resolve, reject) {
    try {
      userModel
        .findOne({ email: req.body.email })
        // .populate("subscriptions")
        .exec(async function (err, user) {
          if (
            user &&
            (await utils.verifyToken(req.body.password, user.password))
          ) {
            const token = await utils.createToken(user._id, user.email);
            user.lastLoginDate = Date.now();
            user.save();
            return resolve({
              code: 200,
              data: {
                user,
                token,
              },
              message: "User Logged In Successfully",
            });
          } else {
            return reject({
              code: 400,
              message: "Incorrect UserName/Password",
            });
          }
        });
    } catch (error) {
      return reject({ code: 500, message: error.message });
    }
  });
};
exports.createUser = async (req) => {
  return new Promise(async function (resolve, reject) {
    try {
      const newUser = new userModel({ ...req.body, signUpDate: Date.now() }); // here we are wrapping our data into model
      const found = await userModel.findOne({ email: req.body.email });
      if (found) {
        return reject({
          code: 400,
          message: `User with ${req.body.email} email already exist `,
        });
      } else {
        newUser.save(async (err, res) => {
          const token = await utils.createToken();
          return resolve({
            user: newUser,
            code: 200,
            token,
            message: "Your Account has been Created Successfully",
          });
        });
      }
    } catch (error) {
      return reject({ error: error.message });
    }
  });
};
exports.updateUser = async (req) => {
  return new Promise(async function (resolve, reject) {
    try {
      const user = await userModel.findById(req.params.id);
      const { email, _id, ...rest } = req.body;
      Object.assign(user, rest);
      user.save();
      return resolve(user);
    } catch (error) {
      return reject({ code: 500, message: error.message });
    }
  });
};

exports.deleteUser = async (req) => {
  return new Promise(function (resolve, reject) {
    try {
      const { user_id: _id } = req.user;
      if (!mongoose.Types.ObjectId.isValid(_id))
        return reject({ code: 400, message: "No Such User exist " });
      userModel.deleteOne({ _id: _id }).exec(function (err, resp) {
        if (err) return reject({ code: 400, message: err.message });
        return resolve({ code: 200, message: " User has been Deleted" });
      });
    } catch (error) {
      return reject({ code: 500, message: error.message });
    }
  });
};
exports.singleUser = async (req) => {
  console.log("Req.params.id", req.params.id);
  return await controllerWrapper({
    singleUser: userModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $project: {
          name: {
            $concat: ["$firstName", " ", "$lastName"],
          },

          firstName: "$firstName",
          lastName: "$lastName",
          phone: "$phone",
          // photo: "$photo",
          // password: "$password",
          address: "$address",
          city: "$city",
          country: "$country",
          // subscriptions: "$subscriptions",
          // role: "$role",
          // signUpDate: "$signUpDate",
          // lastLoginDate: "$lastLoginDate",
          // userPaymentMethods: "$userPaymentMethods",
        },
      },
    ]),
    message: "User has been Fetched SuccessFully",
  });

  // return new Promise(async function (resolve, reject) {
  //   await userModel
  //     .aggregate([{ $match: { _id: req.params.id } }])
  //     .exec(function (err, user) {
  //       if (err) return reject({ code: 400, error: err });
  //       return resolve({ code: 200, data: user });
  //     });
  // });
};
