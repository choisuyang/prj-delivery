require("./removeByValue")();

module.exports = (io) => {
  let userList = [];
  let userSocketId = {};
  io.on("connection", (socket) => {
    // console.log("socket server connect");
    // console.log("-->", socket);
    const session = socket.request.session.passport;
    // console.log("--->", session);
    const user = typeof session !== "undefined" ? session.user : "";

    if (typeof user == "undefined") return;

    userSocketId[user.id] = socket.id;

    socket.on("client order", function (data) {
      const socketId = userSocketId[data.user_id];

      socket.to(socketId).emit("server order");
    });
    console.log(`소켓 아이디 : ${socket.id}`);
    console.log("--->usersocket", userSocketId);
    if (!userList.includes(user.displayname)) {
      userList.push(user.displayname);
    }
    console.log("----user", userList);
    io.emit("join", userList);

    socket.on("disconnect", () => {
      userList.removeByValue(user.displayname);
      io.emit("leave", userList);
    });

    socket.on("disconnect", () => {});
    socket.on("client message", (data) =>
      io.emit("server message", {
        message: data.message,
        displayname: user.displayname,
      })
    );
  });
};
