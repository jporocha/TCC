// /api/users/

const UserService = require("../services/UserService");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/createUser", auth("Administrador"), async (req, res) => {
  const {
    name,
    email,
    role,
    disponibilidade,
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
    disponibilidade,
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

router.get("/", auth(), async (req, res) => {
  let query = req.user.role === "Administrador" ? {} : { enabled: true };
  let response = await UserService.FetchUsers(query);
  res.status(response.statusCode).send(response.payload);
});

router.get("/doctors", auth(), async (req, res) => {
  let response = await UserService.FetchUsers({ role: "Médico" });
  res.status(response.statusCode).send(response.payload);
});

router.put("/:id", auth("Administrador"), async (req, res) => {
  let id = req.params.id;
  let changes = req.body;

  if (!changes)
    return res.status(400).send("Não foram enviados parâmetros para edição.");

  let response = await UserService.EditUser(id, changes);

  res.status(response.statusCode).send(response.payload);
});

module.exports = router;
