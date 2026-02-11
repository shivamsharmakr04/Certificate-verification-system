const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, unique: true },
  studentName: String,
  domain: String,
  startDate: Date,
  endDate: Date,
  issueDate: Date
});

module.exports = mongoose.model("Certificate", certificateSchema);
