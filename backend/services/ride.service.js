const rideModel = require("../models/ride.model");
const mapService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  const fareRates = {
    car: { baseFare: 50, perKm: 15, minFare: 100 },
    auto: { baseFare: 30, perKm: 10, minFare: 50 },
    moto: { baseFare: 20, perKm: 8, minFare: 30 },
  };

  if (!pickup || !destination)
    throw new Error("Pick up and destination are required");

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  // console.log("distance time", distanceTime);

  let fares = {};

  for (const vehicle in fareRates) {
    const { baseFare, perKm, minFare } = fareRates[vehicle];
    const fare = Math.max(baseFare + distanceTime.distance * perKm, minFare);
    //console.log("fare", fare);

    fares[vehicle] = Math.round(fare); // Round to nearest ₹
  }

  return fares;
}

function getOTP(num) {
  return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType)
    throw new Error("All fields are required");
  const fare = await getFare(pickup, destination);
  //console.log("fare", fare);
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    vehicleType,
    otp: getOTP(6),
    fare: fare[vehicleType],
  });
  return ride;
};

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) throw new Error(`Ride id is required`);

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: "accepted",
      captain: captain._id,
    }
  );
  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");
  if (!ride) throw new Error("ride not found");
  return ride;
};

module.exports.getFare = getFare;
