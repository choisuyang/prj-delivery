const { Router } = require("express");
const router = Router();

// router.use("/", require("./home"));

router.use("/admin", require("./admin"));

router.use("/accounts", require("./accounts"));

router.use("/auth", require("./auth"));
router.use("/chat", require("./chat"));
router.use("/shops", require("./shops"));
router.use("/cart", require("./cart"));
router.use("/checkout", require("./checkout"));
router.use("/", require("./home"));

module.exports = router;
