const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];
  const myArray = req.headers["authorization"]?.split(" ") ?? [];

  if (!myArray[1]) {
    return res.status(403).send("A token is required for authentication");
  }
  const newToken = myArray[1];
  try {
    const decoded = jwt.verify(newToken, process.env.PUBLIC_KEY); // here we are verifying the token that is this created by our public key or not
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
