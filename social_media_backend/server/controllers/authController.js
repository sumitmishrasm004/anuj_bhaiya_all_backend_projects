const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/responseWrapper");

const signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      // return res.status(400).send("All fields are required");
      return res.send(error(400, "All fields are required"));
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      //   return res.status(409).send("User is already exists");
      return res.send(error(409, "User is already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // return res.status(201).json({ user });
    return res.send(success(201, "user created successfully"));
  } catch (e) {
    // res.status(500).send(error);
    return res.send(error(500, e.message));
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      //  return res.status(400).send("All fields are required");
      return res.send(error(400, "All fields are required"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      //   return res.status(404).send("User is not exists");
      return res.send(error(404, "User is not exists"));
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      //   return res.status(403).send("Incorrect password");
      return res.send(error(403, "Incorrect password"));
    }

    const accessToken = await generateAccessToken({
      id: user.id,
    });
    console.log("accessToken", accessToken);
    const refreshToken = await generateRefereshToken({
      id: user.id,
    });
    console.log("refreshToken", refreshToken);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    // return res.status(200).json({
    //   accessToken,
    //   refreshToken,
    // });

    // return res.status(200).json({
    //   accessToken,
    // });
    return res.send(success(200, { accessToken }));
    // return res.status(200).json({ user });
  } catch (e) {}
};

// this api will check the refresh token validity and generate a new access token
const refreshAccessTokenController = async (req, res) => {
  //   const { refreshToken } = req.body;
  const cookies = req.cookies;

  if (!cookies.jwt) {
    // return res.status(401).send("Refresh token is required");
    return res.send(error(401, "Refresh token is required"));
  }

  const refreshToken = cookies.jwt;

  //   if (!refreshToken) {
  //     return res.status(401).send("Refresh token is required");
  //   }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const id = decoded.id;
    const accessToken = generateAccessToken({ id });

    // return res.status(201).json({ accessToken });
    return res.send(success(201, { accessToken }));
  } catch (e) {
    console.log(e);
    // return res.status(401).send("Invalid refresh token");
    return res.send(error(401, "Invalid refresh token"));
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, "user logout successfully"));
  } catch (e) {
    console.log("error", e.message);
    return res.send(error(500, e.message));
  }
};

const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    return token;
  } catch (e) {
    console.log(e);
  }
};

const generateRefereshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1y",
    });
    return token;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  signUpController,
  loginController,
  refreshAccessTokenController,
  logoutController,
};
