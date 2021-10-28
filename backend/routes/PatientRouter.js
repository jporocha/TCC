// /api/patients/

const PatientService = require("../services/PatientService");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/newPatient", auth(), async (req, res) => {
  const { name, dateOfBirth, cellPhone, nameOfParents, cpf } = req.body;

  if (!name || !cellPhone || (!nameOfParents && !cpf))
    return res.status(400).send("Dados mínimos incompletos");

  const newPatient = {
    name,
    dateOfBirth,
    cellPhone,
    nameOfParents,
    cpf,
    enabled: true,
  };

  let response = await PatientService.CreatePatient(newPatient);
  res.status(response.statusCode).send(response.payload);
});

router.get("/", auth(), async (req, res) => {
  let query = req.user.role === "Administrador" ? {} : { enabled: true };
  let response = await PatientService.FetchPatients(query);
  res.status(response.statusCode).send(response.payload);
});

router.get("/:id", auth(), async (req, res) => {
  let id = req.params.id;
  let response = await PatientService.FetchPatients({ _id: id });
  res.status(response.statusCode).send(response.payload);
});

router.put("/:id", auth(), async (req, res) => {
  let id = req.params.id;
  let changes = req.body;

  if (!changes)
    return res.status(400).send("Não foram enviados parâmetros para edição.");

  let response = await PatientService.EditPatient(id, changes);

  res.status(response.statusCode).send(response.payload);
});

module.exports = router;
