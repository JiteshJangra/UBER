const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  if (io) {
    console.log("Socket.io is already initialized.");
    return io;
  }

  io = socketIo(server, {
    cors: {
      origin: "*", // Allow all origins (update for production)
      methods: ["GET", "POST"],
    },
  });

  console.log("Socket.io initialized");

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Handle user joining
    socket.on("join", async (data) => {
      const { userId, userType } = data;
      try {
        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
        // console.log(
        //   `Updated socket ID for ${userType}: ${userId} : ${socket.id}`
        // );
      } catch (error) {
        console.error("Error updating socket ID:", error);
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng)
        return socket.emit(`error `, { message: "invalid location data" });

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

// Function to send a message to a specific socket ID
const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(`sending message to ${socketId}`, messageObject);
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io is not initialized.");
  }
};

module.exports = { initializeSocket, sendMessageToSocketId };
