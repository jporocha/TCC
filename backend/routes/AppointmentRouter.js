// /api/appointment/

const AppointmentService = require("../services/AppointmentService");
const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const auth = require("../middleware/auth");

router.post("/createAppointment", auth(), async (req, res) => {
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

router.put("/edit/:id", auth(), async (req, res) => {
  const { patientId, doctorId, date, tipo } = req.body;

  if (!patientId || !doctorId || !date || !tipo)
    return res.status(400).send({ erro: "Dados incompletos" });

  const id = req.params.id;

  const changes = {
    patientId,
    doctorId,
    date,
    tipo,
  };

  let response = await AppointmentService.EditAppointment(id, changes);
  res.status(response.statusCode).send(response.payload);
});

router.get("/byPatient/:id", auth(), async (req, res) => {
  let id = req.params.id;
  let response = await AppointmentService.FetchPatientAppointments(id);
  res.status(response.statusCode).send(response.payload);
});

router.get("/", auth(), async (req, res) => {
  let response = await AppointmentService.FetchAppointments({ cancel: false });
  res.status(response.statusCode).send(response.payload);
});

router.get("/:id", auth(), async (req, res) => {
  let id = req.params.id;
  let payload = {
    _id: id,
    cancel: false,
  };
  let response = await AppointmentService.FetchAppointments(payload);
  res.status(response.statusCode).send(response.payload);
});

router.put("/cancel/:id", auth(), async (req, res) => {
  let id = req.params.id;
  let payload = {
    cancel: true,
  };
  let response = await AppointmentService.EditAppointment(id, payload);
  res.status(response.statusCode).send(response.payload);
});

router.post("/getSlots", auth(), async (req, res) => {
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

router.put("/appointmentResults", auth(), async (req, res) => {
  const appointment = req.body;

  if (!appointment) return res.status(400).send({ erro: "Dados incompletos" });

  let response = await AppointmentService.SaveAppointment(appointment);
  res.status(response.statusCode).send(response.payload);
});

router.get("/decryptedNotes/:id", auth(), async (req, res) => {
  const id = req.params.id;
  let response = await AppointmentService.LoadNotes(id);
  res.status(response.statusCode).send(response.payload);
});

router.put("/appointmentReview", auth("Administrador"), async (req, res) => {
  const { id, doctorNotes } = req.body;
  if (!doctorNotes || !id)
    return res.status(400).send({ erro: "Dados incompletos" });
  let response = await AppointmentService.ChangeAppointmentData(
    id,
    doctorNotes
  );
  res.status(response.statusCode).send(response.payload);
});

module.exports = router;
