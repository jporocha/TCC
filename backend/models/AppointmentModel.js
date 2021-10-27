const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PosologyModel = new mongoose.Schema({
  medId: {
    type: Schema.Types.ObjectId,
    ref: "Medicine",
  },
  medicine: String,
  dosage: String,
  posologia: String,
});

let ExamModel = new mongoose.Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: "Exams",
  },
  name: String,
  result: {
    type: Schema.Types.ObjectId,
    ref: "File",
  },
});

let appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tipo: String,
  cancel: {
    type: Boolean,
    default: false,
  },
  encryptedNotes: String,
  prescription: [PosologyModel],
  exams: [ExamModel],
  start: String,
  end: String,
});

const model = mongoose.model("Appointment", appointmentSchema);

module.exports = model;
