const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");



module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array });
  }

  const { address } = req.query;
  try {
    const coordinates = await mapService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "internal server error" });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }

    const { origin,destination } = req.query;
    try {

        console.log(origin, destination);
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        if (!distanceTime) {
          return res.status(404).json({ message: "No route found" });
        }
      res.status(200).json(distanceTime);
    } catch (error) {
        console.error("Error:", error.message);
      res.status(404).json({ messgae: "internal server error1" });
    }
}
