// /api/users/

const UserService = require("../services/UserService");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/createUser", async (req, res) => {
  const {
    name,
    email,
    role,
    emphasis,
    partners,
    dateOfBirth,
    cellPhone,
    addr,
  } = req.body;

  if (!name || !email || !role || !cellPhone)
    return res.status(400).send("Dados mínimos incompletos");

  const newUser = {
    name,
    email,
    role,
    emphasis,
    partners,
    dateOfBirth,
    cellPhone,
    addr,
    enabled: true,
  };

  let response = await UserService.CreateUser(newUser);
  res.status(response.statusCode).send(response.payload);
});

router.post("/recoverPassword", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).send("Dados incompletos");

  let response = await UserService.RecoverPassword(email);
  res.status(response.statusCode).send(response.payload);
});

router.post("/resetPassword", async (req, res) => {
  const { email, token, password } = req.body;

  if (!token || !password || !email)
    return res.status(400).send("Dados incompletos");

  let response = await UserService.ResetPassword(email, token, password);

  res.status(response.statusCode).send(response.payload);
});

router.post("/accessToken", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).send("Informe o e-mail.");

  let response = await UserService.CreateAccessToken(email);
  res.status(response.statusCode).send(response.payload);
});

router.get("/", async (req, res) => {
  let response = await UserService.FetchUsers(false);
  res.status(response.statusCode).send(response.payload);
});

router.get("/doctors", async (req, res) => {
  let response = await UserService.FetchUsers(true);
  res.status(response.statusCode).send(response.payload);
});

router.put("/:id", async (req, res) => {
  let id = req.params.id;
  let changes = req.body;

  if (!changes)
    return res.status(400).send("Não foram enviados parâmetros para edição.");

  let response = await UserService.EditUser(id, changes);

  res.status(response.statusCode).send(response.payload);
});

module.exports = router;
