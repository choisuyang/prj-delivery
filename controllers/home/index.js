const { Router } = require("express");
const router = Router();
const models = require("../../models");

router.get("/", async (req, res) => {
  const shops = await models.Shops.findAll();

  res.render("home.html", { shops });
});

module.exports = router;
