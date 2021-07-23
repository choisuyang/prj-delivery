const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const models = require("../models");

const dotenv = require("dotenv");
dotenv.config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APPID,
      clientSecret: process.env.FACEBOOK_SECRETCODE,
      callbackURL: `${process.env.SITE_DOMAIN}/auth/facebook/callback`,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log("AccessToken", accessToken);
      console.log("Profile", profile);
      // console.log("Profile-Displayname", profile.displayName);
      // console.log("Profile-email", profile.emails[0].value);
      // console.log("Profile_raw", profile._raw);
      // console.log("Profile-json", profile._json);
      // console.log("RefreshToken", refreshToken);
      try {
        const username = `fb_${profile.id}`;
        const exist = await models.User.count({
          where: {
            username,
          },
        });

        if (!exist) {
          user = await models.User.create({
            username,
            displayname: profile.displayName,
            password: "facebook",
          });
        } else {
          user = await models.User.findOne({
            where: {
              username,
            },
          });
        }
        return done(null, user);
      } catch (e) {}
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
