const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../models/UserModel");
const User = new UserModel();

passport.serializeUser(function (user, done) {
  done(null, { id: user._id, nome: user.name, role: user.role });
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

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
