require("./removeByValue")();

module.exports = (io) => {
  let userList = [];
  io.on("connection", (socket) => {
    // console.log("socket server connect");
    // console.log("-->", socket);
    const session = socket.request.session.passport;
    console.log("--->", session);
    const user = typeof session !== "undifined" ? session.user : "";

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
