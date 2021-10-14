const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const googleStrategy = require("passport-google-oauth20").Strategy;
const UserModel = require("../models/UserModel");
const User = new UserModel();

passport.serializeUser(function (user, done) {
  done(null, { id: user._id, nome: user.name, acesso: user.role });
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_APP_ID,
      clientSecret: process.env.GOOGLE_APP_SECRET,
      callbackURL: `${process.env.GOOGLE_CALLBACK}`,
    },
    function (accessToken, refreshToken, profile, cb) {
      User.FindOrCreateUser(
        {
          name: profile.displayName,
          googleId: profile.id,
          email: profile._json.email,
        },
        { googleId: profile.id }
      )
        .then((res) => {
          if (res.user) return cb(null, res.user);
          throw res.error;
        })
        .catch((err) => {
          return cb(err, null);
        });
    }
  )
);

passport.use(
  new localStrategy(function (username, password, cb) {
    let user = {
      email: username,
      password,
    };
    User.validateLogin(user)
      .then((res) => {
        if (res.user) return cb(null, res.user);
        throw res.error;
      })
      .catch((err) => {
        return cb(err, null);
      });
  })
);

module.exports = passport;
