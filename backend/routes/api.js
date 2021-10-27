const express = require("express");
const router = express.Router();

router.use("/users", require("./UserRouter.js"));
router.use("/auth", require("./AuthRouter.js"));
router.use("/appointment", require("./AppointmentRouter.js"));
router.use("/medications", require("./MedicationsRouter"));
router.use("/exams", require("./ExamsRouter"));
router.use("/patients", require("./PatientRouter"));
router.use("/file", require("./FileRouter"));

module.exports = router;
