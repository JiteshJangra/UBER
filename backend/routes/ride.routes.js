const express = require("express");
const { body, query } = require("express-validator");
const { createRide, getFare } = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post(
  "/create",
  authMiddleware.authUser,
  [
    body("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("invalid PickUp address1"),
    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("invalid PickUp address2"),
    body("vehicleType")
      .isString()
      .isIn(["car", "auto", "moto"])
      .withMessage("invalid Vehicle Type3"),
  ],
  createRide
);

router.get(
  "/get-fare",
  authMiddleware.authUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid PickUp address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid PickUp address"),
  getFare
);
module.exports = router;
