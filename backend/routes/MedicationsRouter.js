// /api/medications/

const MedicineService = require("../services/MedicineService");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  const { brandLabel, labName, activePrinciple, enabled = true } = req.body;
  if (!brandLabel || !labName || !activePrinciple)
    return res.status(400).send("Dados mínimos incompletos");
  const newMedication = {
    brandLabel,
    labName,
    activePrinciple,
    enabled,
  };
  let response = await MedicineService.CreateMedication(newMedication);
  res.status(response.statusCode).send(response.payload);
});

router.put("/edit/:id", async (req, res) => {
  const { brandLabel, labName, activePrinciple, enabled = true } = req.body;
  if (!brandLabel || !labName || !activePrinciple)
    return res.status(400).send("Dados incompletos");
  const medication = {
    brandLabel,
    labName,
    activePrinciple,
    enabled,
  };
  const id = req.params.id;
  let response = await MedicineService.EditMedication(id, medication);
  res.status(response.statusCode).send(response.payload);
});

router.get("/", async (req, res) => {
  let response = await MedicineService.FetchMedications();
  res.status(response.statusCode).send(response.payload);
});

module.exports = router;
