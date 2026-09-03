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
  try {
    const cert = await Certificate.findOne({ certificateId: req.params.id });
    if (!cert) return res.status(404).json({ msg: "Certificate not found" });

    const doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
      margin: 40
    });

    const fileName = `Certificate_${cert.certificateId.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    doc.pipe(res);

    // Outer Decorative Border
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
       .lineWidth(4)
       .strokeColor("#1e3a8a")
       .stroke();

    doc.rect(26, 26, doc.page.width - 52, doc.page.height - 52)
       .lineWidth(1.5)
       .strokeColor("#d97706")
       .stroke();

    // Header Title
    doc.moveDown(1.5);
    doc.fillColor("#1e3a8a")
       .fontSize(28)
       .font("Helvetica-Bold")
       .text("CERTIFICATE OF INTERNSHIP", { align: "center" });

    doc.moveDown(0.3);
    doc.fillColor("#64748b")
       .fontSize(12)
       .font("Helvetica")
       .text("THIS CERTIFICATE IS PROUDLY PRESENTED TO", { align: "center" });

    // Student Name
    doc.moveDown(1);
    doc.fillColor("#0f172a")
       .fontSize(32)
       .font("Helvetica-Bold")
       .text(cert.studentName, { align: "center" });

    // Underline for name
    const nameY = doc.y + 4;
    doc.moveTo(doc.page.width / 4, nameY)
       .lineTo((doc.page.width / 4) * 3, nameY)
       .lineWidth(1)
       .strokeColor("#d97706")
       .stroke();

    // Internship Details
    doc.moveDown(1.2);
    doc.fillColor("#334155")
       .fontSize(14)
       .font("Helvetica")
       .text(
         `for successfully completing the internship in ${cert.domain.toUpperCase()}`,
         { align: "center" }
       );

    const startDateStr = cert.startDate ? new Date(cert.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A";
    const endDateStr = cert.endDate ? new Date(cert.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A";
    const issueDateStr = cert.issueDate ? new Date(cert.issueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : new Date().toLocaleDateString();

    doc.moveDown(0.5);
    doc.fontSize(12)
       .fillColor("#475569")
       .text(
         `Duration: ${startDateStr} to ${endDateStr}`,
         { align: "center" }
       );

    // Footer Info & Verification ID
    doc.moveDown(2);
    const bottomY = doc.page.height - 120;

    // Left Column: Certificate ID & Issue Date
    doc.fontSize(10)
       .fillColor("#64748b")
       .font("Helvetica-Bold")
       .text(`Certificate ID: ${cert.certificateId}`, 60, bottomY);
    doc.fontSize(10)
       .font("Helvetica")
       .text(`Issue Date: ${issueDateStr}`, 60, bottomY + 16);
    doc.text(`Status: Verified Authentic`, 60, bottomY + 32);

    // Right Column: Signature Line
    doc.moveTo(doc.page.width - 240, bottomY + 24)
       .lineTo(doc.page.width - 60, bottomY + 24)
       .lineWidth(1)
       .strokeColor("#94a3b8")
       .stroke();

    doc.fontSize(11)
       .fillColor("#1e293b")
       .font("Helvetica-Bold")
       .text("Authorized Signatory", doc.page.width - 240, bottomY + 30, { width: 180, align: "center" });

    doc.fontSize(9)
       .fillColor("#64748b")
       .font("Helvetica")
       .text("CertiVerify System Admin", doc.page.width - 240, bottomY + 44, { width: 180, align: "center" });

    doc.end();
  } catch (err) {
    res.status(500).json({ msg: "Error generating PDF", error: err.message });
  }
});

module.exports = router;
