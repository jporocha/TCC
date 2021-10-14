const mongoose = require("mongoose");

let medicineSchema = new mongoose.Schema({
  brandLabel: String,
  labName: String,
  activePrinciple: String,
  enabled: Boolean,
});

const model = mongoose.model("Medicine", medicineSchema);

module.exports = model;
