const axios = require("axios");

const API_KEY = process.env.MAPS_API || "YOUR_HERE_API_KEY";

// Function to get coordinates from an address
const getAddressCoordinate = async (address) => {
  if (!address) throw new Error("Address is required");

  const apiUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
    address
  )}&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(apiUrl);

    if (!response.data.items || response.data.items.length === 0) {
      throw new Error(`Address not found: ${address}`);
    }

    // Extract coordinates
    const { lat, lng } = response.data.items[0].position;

    return {
      address: address,
      latitude: lat,
      longitude: lng,
    };
  } catch (error) {
    throw new Error(
      `Error fetching coordinates for ${address}: ${error.message}`
    );
  }
};

// Function to get distance & time
const getDistanceTime = async (origin, destination) => {
  if (!origin || !destination)
    throw new Error("Origin and destination are required");

  try {
    // Convert addresses to coordinates
    const originCoords = await getAddressCoordinate(origin); // ✅ Use the function correctly
    const destinationCoords = await getAddressCoordinate(destination); // ✅ Use the function correctly

    console.log("Origin:", originCoords);
    console.log("Destination:", destinationCoords);

    // Construct API URL
    const apiUrl = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${originCoords.latitude},${originCoords.longitude}&destination=${destinationCoords.latitude},${destinationCoords.longitude}&return=summary&apikey=${API_KEY}`;

    const response = await axios.get(apiUrl);

    if (!response.data.routes || response.data.routes.length === 0) {
      throw new Error("No route found");
    }

    const route = response.data.routes[0].sections[0].summary;

    console.log("Route Summary:", route);

    return {
      distance: `${(route.length / 1000).toFixed(2)} km`, // Convert meters to km
      duration: `${Math.round(route.duration / 60)} min`, // Convert seconds to minutes
    };
  } catch (error) {
    throw new Error(`Error fetching route details: ${error.message}`);
  }
};


module.exports = { getAddressCoordinate, getDistanceTime };
