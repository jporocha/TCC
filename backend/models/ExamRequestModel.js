const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let examrequestSchema = new mongoose.Schema({
  exam: {
    type: Schema.Types.ObjectId,
    ref: "Exams",
  },
  result: {
    type: Schema.Types.ObjectId,
    ref: "File",
  },
  sentToPatient: Boolean,
  patientId: String,
});

const model = mongoose.model("ExamRequest", examrequestSchema);

module.exports = model;
