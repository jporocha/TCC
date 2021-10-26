// /api/appointment/

const AppointmentService = require("../services/AppointmentService");
const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const auth = require("../middleware/auth");

router.post("/createAppointment", async (req, res) => {
  const { patientId, doctorId, date, tipo } = req.body;

  if (!patientId || !doctorId || !date || !tipo)
    return res.status(400).send({ erro: "Dados incompletos" });

  const newAppointment = {
    patientId,
    doctorId,
    date,
    tipo,
  };

  let response = await AppointmentService.CreateAppointment(newAppointment);
  res.status(response.statusCode).send(response.payload);
});

router.put("/:id", async (req, res) => {
  let id = req.params.id;
  let changes = req.body;

  if (!changes)
    return res.status(400).send("Não foram enviados parâmetros para edição.");

  let response = await AppointmentService.EditAppointment(id, changes);

  res.status(response.statusCode).send(response.payload);
});

router.get("/byPatient/:id", async (req, res) => {
  let id = req.params.id;
  let response = await AppointmentService.FetchPatientAppointments(id);
  res.status(response.statusCode).send(response.payload);
});

router.get("/", async (req, res) => {
  let response = await AppointmentService.FetchAppointments({ cancel: false });
  res.status(response.statusCode).send(response.payload);
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let payload = {
    _id: id,
    cancel: false,
  };
  let response = await AppointmentService.FetchAppointments(payload);
  res.status(response.statusCode).send(response.payload);
});

router.put("/cancel/:id", async (req, res) => {
  let id = req.params.id;
  let payload = {
    cancel: true,
  };
  let response = await AppointmentService.EditAppointment(id, payload);
  res.status(response.statusCode).send(response.payload);
});

router.post("/getSlots", async (req, res) => {
  const { doctorId, date } = req.body;

  if (!doctorId || !date)
    return res.status(400).send({ erro: "Dados incompletos" });

  let nextDay = dayjs(date).add(1, "day").format("YYYY-MM-DD");

  let payload = {
    doctorId,
    date: {
      $gte: date,
      $lt: nextDay,
    },
    cancel: false,
  };
  let response = await AppointmentService.FetchAppointments(payload);
  res.status(response.statusCode).send(response.payload);
});

module.exports = router;
