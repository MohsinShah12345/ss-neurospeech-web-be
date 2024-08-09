const { check } = require("express-validator");
exports.LoginValidator = [
  check("email").trim().isEmail().notEmpty().withMessage("In Valid Email"),
  check("password").trim().escape().notEmpty().withMessage(""),
];
