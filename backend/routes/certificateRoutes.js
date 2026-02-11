const express = require("express");
const PDFDocument = require("pdfkit");
const Certificate = require("../models/Certificate");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const cert = await Certificate.findOne({ certificateId: req.params.id });
  if (!cert) return res.status(404).json({ msg: "Not found" });
  res.json(cert);
});

router.get("/download/:id", async (req, res) => {
  const cert = await Certificate.findOne({ certificateId: req.params.id });
  if (!cert) return res.status(404).json({ msg: "Not found" });

  const doc = new PDFDocument();
  res.setHeader("Content-Disposition", "attachment; filename=certificate.pdf");
  doc.pipe(res);

  doc.fontSize(20).text("Internship Certificate", { align: "center" });
  doc.moveDown();
  doc.text(`Name: ${cert.studentName}`);
  doc.text(`Domain: ${cert.domain}`);
  doc.text(`Duration: ${cert.startDate.toDateString()} - ${cert.endDate.toDateString()}`);
  doc.text(`Issue Date: ${cert.issueDate.toDateString()}`);

  doc.end();
});

module.exports = router;
