const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let fileSchema = new mongoose.Schema({
  filename: String,
  key: String,
  mimetype: String,
  nameOfExam: String,
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  uploadCode: { type: String, default: "" },
  sentToLab: { type: Boolean, default: false },
  sentToPatient: { type: Boolean, default: false },
  patientEmail: String,
});

const model = mongoose.model("File", fileSchema, "Files");

module.exports = model;
