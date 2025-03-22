const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklistToken.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorize" });

  const isBlacklisted = await blacklistModel.findOne({ token: token });
  if (isBlacklisted)
  {
    return res.status(401).json({ message: "Unauthorizedd" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorize" });

  const isBlacklisted = await blacklistModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorizedd" });
  }
  try {
    //console.log( token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log( decoded._id)
    const captain = await captainModel.findById(decoded._id);
    //console.log(captain);
    req.captain = captain;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorizeddd" });
  }
};

