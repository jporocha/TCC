const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  available: {
    type: Boolean,
    default: true,
  },
  encryptedNotes: String,
  prescription: [
    {
      type: Schema.Types.ObjectId,
      ref: "Posology",
    },
  ],
  exams: [
    {
      type: Schema.Types.ObjectId,
      ref: "ExamRequest",
    },
  ],
  patientCheckin: Date,
  appointmentStart: Date,
  appointmentEnd: Date,
});

const model = mongoose.model("Appointment", appointmentSchema);

module.exports = model;
