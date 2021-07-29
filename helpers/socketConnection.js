module.exports = (io) => {
  let userList = [];
  io.on("connection", (socket) => {
    // console.log("socket server connect");
    const session = socket.request.session.passport;
    const user = typeof session !== "undifined" ? session.user : "";

    if (!userList.includes(user.displayname)) {
      userList.push(user.displayname);
    }

    io.emit("join", userList);
    socket.on("client message", (data) =>
      io.emit("server message", {
        message: data.message,
        displayname: user.displayname,
      })
    );
  });
};
