const jwt = require("jsonwebtoken");
const { error } = require("../utils/responseWrapper");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  console.log("I am inside middleware");
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    // return res.status(401).send("Authorization header is required");
    return res.send(error(401, "Authorization header is required"));
  }

  const accessToken = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.id = decoded.id;

    const user = await User.findById(req.id);
    if (!user) {
      return res.send(error(404, "User not found"));
    }

    next();
  } catch (e) {
    console.log("error", e.message);
    // return res.status(401).send("Invalid token");
    return res.send(error(401, "Invalid token"));
  }
  console.log("Access token", accessToken);
  // next();
};
