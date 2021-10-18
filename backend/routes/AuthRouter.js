// /api/auth/

let passport = require("../config/passport");
const express = require("express");
const router = express.Router();

// Login local
router.post("/login", function (req, res) {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).send("Dados de login inválidos");
  passport.authenticate("local", function (err, user) {
    if (err) return res.status(400).send(err);
    req.login(user, function (fail) {
      if (fail) return res.status(400).send(fail);
      res.status(200).send(user.role);
    });
  })(req, res);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send("Usuário desconectou do sistema...");
});

// Checa existência de sessão no frontend
router.get("/user", (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(400).send(null);
  }
});

module.exports = router;
