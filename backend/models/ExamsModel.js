const mongoose = require("mongoose");

let examsSchema = new mongoose.Schema({
  name: String,
  enabled: Boolean,
});

const model = mongoose.model("Exams", examsSchema);

module.exports = model;
