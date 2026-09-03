const mongoose = require("mongoose");

const verificationLogSchema = new mongoose.Schema({
  certificateId: { type: String, required: false },
  verificationMethod: { 
    type: String, 
    enum: ["id_search", "ocr_image"], 
    default: "id_search" 
  },
  result: { 
    type: String, 
    enum: ["authentic", "tampered", "not_found"], 
    required: true 
  },
  confidenceScore: { type: Number, default: 100 },
  extractedData: {
    extractedId: String,
    extractedName: String,
    rawTextSnippet: String
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("VerificationLog", verificationLogSchema);
