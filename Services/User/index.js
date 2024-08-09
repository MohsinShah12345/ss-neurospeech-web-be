const express = require("express");
const router = express.Router();
const multer = require("multer");
const users = require("./routes/index");
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");
const { LoginValidator } = require("./validator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/my-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ dest: "uploads/" }); // destination for file uploading

router.get("/getAllUsers", auth, users.getUsers);
router.post("/logIn", LoginValidator, users.loginIn);
router.get("/singleUser/:id", LoginValidator, auth, users.singleUser); // getting single user
router.post("/signUp", LoginValidator, users.createUser); // sign Up
router.patch(
  "/updateUser/:id",
  LoginValidator,
  auth,
  upload.single("image"),
  users.updateUser
);
router.delete("/deleteUser/:id", auth, users.deleteUser);

module.exports = router;
