module.exports = (io) => {
  io.on("connection", (socket) => {
    // console.log("socket server connect");
    socket.on("client message", (data) => io.emit("server message", data.message));
  });
};
