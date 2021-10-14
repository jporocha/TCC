const mongoose = require("mongoose");

let fileSchema = new mongoose.Schema({
  filename: String,
  key: String,
  mimetype: String,
});

const model = mongoose.model("File", fileSchema, "Files");

module.exports = model;
