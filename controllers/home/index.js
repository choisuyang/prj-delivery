const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("home.html");
});

module.exports = router;
