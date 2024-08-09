const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.createToken = async (user_id, email) => {
  const token = jwt.sign(
    { user_id: user_id, email: email },
    process.env.PUBLIC_KEY,
    {
      expiresIn: "24h",
    }
  );
  return token;
};
exports.encryptPassword = async (password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return encryptedPassword;
};
exports.verifyToken = async (bodyPassword, savedPassword) => {
  const verify = await bcrypt.compare(bodyPassword, savedPassword);
  return verify;
};
