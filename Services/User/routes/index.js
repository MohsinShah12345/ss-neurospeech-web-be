const mongoose = require("mongoose");
const userModel = require("../../../models/users.js");
const Users = require("../../../controllers/users");
//import auth from '../middleware/auth.js'
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { body, validationResult } = require("express-validator");

exports.getUsers = async (req, res) => {
  try {
    const data = await Users.getUsers(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.Welcome = async (req, res) => {
  try {
    const data = await Users.Welcome(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.loginIn = async (req, res) => {
  try {
    const data = await Users.loginIn(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.singleUser = async (req, res) => {
  try {
    const data = await Users.singleUser(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.createUser = async (req, res) => {
  try {
    const data = await Users.createUser(req);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.UpdatePassowrd = async (req, res) => {
  try {
    const data = await Users.UpdatePassowrd(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.updateUser = async (req, res) => {
  try {
    const data = await Users.updateUser(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const data = await Users.deleteUser(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
