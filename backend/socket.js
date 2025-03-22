const socketio = require("socket.io");

let io;
function initializeSocket(server) {
  io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  //console.log(io);

  io.on("connection", (socket) => {
    console.log(`Client connected : ${socket.id}`);
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
  console.log("Socket Initialized");
}

function sendMessageToSocketId(socketId, message) {
  if (io) io.to(socketId).emit("message", message);
  else console.log("Socket not initialized");
}

module.exports = { initializeSocket, sendMessageToSocketId };
