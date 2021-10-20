// /api/exams/

const ExamsService = require("../services/ExamsService");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  const { name, enabled = true } = req.body;
  if (!name) return res.status(400).send("Dados mínimos incompletos");
  const newExam = {
    name,
    enabled,
  };
  let response = await ExamsService.CreateExam(newExam);
  res.status(response.statusCode).send(response.payload);
});

router.put("/edit/:id", async (req, res) => {
  const { name, enabled = true } = req.body;
  if (!name) return res.status(400).send("Dados incompletos");
  const exam = {
    name,
    enabled,
  };
  const id = req.params.id;
  let response = await ExamsService.EditExam(id, exam);
  res.status(response.statusCode).send(response.payload);
});

router.get("/", async (req, res) => {
  let response = await ExamsService.FetchExams();
  res.status(response.statusCode).send(response.payload);
});

module.exports = router;
