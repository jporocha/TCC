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
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  uploadCode: { type: String, default: null },
  downloadCode: { type: String, default: null },
  patientEmail: { type: String, default: null },
  sentToLab: { type: Boolean, default: false },
});

const model = mongoose.model("File", fileSchema, "Files");

module.exports = model;
