const mongoose = require("mongoose");

let patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: String,
  cellPhone: { type: String, required: true },
  nameOfParents: String,
  cpf: String,
  enabled: Boolean,
});

const model = mongoose.model("Patient", patientSchema, "Patients");

module.exports = model;
