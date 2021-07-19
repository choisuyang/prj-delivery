const path = require("path");
const multer = require("multer");

const uploadDir = path.join(__dirname, "../uploads");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    callback(null, "shops-" + Date.now() + "." + file.mimetype.split("/")[1]);
  },
});

module.exports = multer({ storage: storage });
