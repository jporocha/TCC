// /api/appointment/

const AppointmentService = require("../services/AppointmentService");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/createUser", [auth("Administrador")], async (req, res) => {
  const {
    name,
    email,
    role,
    emphasis,
    partners,
    dateOfBirth,
    cellPhone,
    addr,
    nameOfMother,
  } = req.body;

  if (!name || !email || !role || !cellPhone)
    return res.status(400).send({ erro: "Dados mínimos incompletos" });

  const newUser = {
    name,
    email,
    role,
    emphasis,
    partners,
    dateOfBirth,
    cellPhone,
    addr,
    nameOfMother,
    salary,
    hourlyRate,
    enabled: true,
  };

  let response = await UserService.CreateUser(newUser);
  res.status(response.statusCode).send(response.payload);
});

router.post("/recoverPassword", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).send({ erro: "Dados incompletos" });

  let response = await UserService.RecoverPassword(email);
  res.status(response.statusCode).send(response.payload);
});

router.post("/resetPassword", async (req, res) => {
  const { email, token, password } = req.body;

  if (!token || !password || !email)
    return res.status(400).send({ erro: "Dados incompletos" });

  let response = await UserService.ResetPassword(email, token, password);

  res.status(response.statusCode).send(response.payload);
});

router.post("/accessToken", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).send({ erro: "Dados incompletos" });

  let response = await UserService.CreateAccessToken(email);
  res.status(response.statusCode).send(response.payload);
});

router.get("/", [auth("Administrador")], async (req, res) => {
  let response = await UserService.FetchUsers();

  res.status(response.statusCode).send(response.payload);
});

router.put("/:id", [auth("Administrador")], async (req, res) => {
  let id = req.params.id;
  let changes = req.body;

  if (!changes)
    return res.status(400).send("Não foram enviados parâmetros para edição.");

  let response = await UserService.EditUser(id, changes);

  res.status(response.statusCode).send(response.payload);
});

module.exports = router;
