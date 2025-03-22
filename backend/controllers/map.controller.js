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


module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
  try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array });
  }

  const { input } = req.query;
    //
    // console.log(origin, destination);

    const suggestions = await mapService.getAutoCompleteSuggestions(input);
    if (!suggestions) {
      return res.status(404).json({ message: "No route found" });
    }

    const titles = suggestions.map((suggestion) => suggestion.address.label);
    //console.log(suggestions[0]);
    //console.log(titles);
    res.status(200).json(titles);

    // const formattedSuggestions = suggestions.map((suggestion) => {
    //   const parts = suggestion.split(", ").reverse(); // Reverse the order
    //   return parts.join(", "); // Join back to a single string
    // });
    // res.status(200).json(formattedSuggestions);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(404).json({ messgae: "internal server error1" });
  }
}
