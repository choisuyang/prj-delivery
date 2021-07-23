const { Router } = require("express");
const router = Router();
const passport = require("../../middleware/passport-facebook");
// https://www.facebook.com/v3.2/dialog/
// oauth?response_type=code&
// redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fauth%2Ffacebook%2Fcallback&
// scope=email&client_id=407927810936102

router.get("/facebook", passport.authenticate("facebook", { scope: "email" }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/auth/facebook/success",
    failureRedirect: "/auth/facebook/fail",
  })
);

router.get("/facebook/success", (req, res) => {
  res.send(req.user);
});

router.get("/facebook/fail", (req, res) => {
  res.send("facebook login fail");
});

module.exports = router;
