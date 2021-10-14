const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let posologySchema = new mongoose.Schema({
  medicine: {
    type: Schema.Types.ObjectId,
    ref: "Medicine",
  },
  amount: String,
  instructions: String,
});

const model = mongoose.model("Posology", posologySchema);

module.exports = model;
