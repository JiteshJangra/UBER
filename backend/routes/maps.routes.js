const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  mapController,
  getCoordinates,
  getAutoCompleteSuggestions,
} = require("../controllers/map.controller");
const { query } = require("express-validator");
const { getDistanceTime } = require("../controllers/map.controller");

const router = express.Router();

router.get(
  "/get-coordinate",
  query("address").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  getCoordinates
);
router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  getDistanceTime
);

router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  getAutoCompleteSuggestions
);
module.exports = router;
