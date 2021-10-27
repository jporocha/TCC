const mongoose = require("mongoose");

let patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: String,
  cellPhone: { type: String, required: true },
  nameOfParents: String,
  cpf: String,
  enabled: { type: Boolean, default: true },
});

const model = mongoose.model("Patient", patientSchema, "Patients");

module.exports = model;
