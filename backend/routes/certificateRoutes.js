const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const PDFDocument = require("pdfkit");
const multer = require("multer");
const fs = require("fs");
const { createWorker } = require("tesseract.js");
const Certificate = require("../models/Certificate");
const User = require("../models/User");
const VerificationLog = require("../models/VerificationLog");
const auth = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// 1. Search Certificate by ID with telemetry logging
router.get("/:id", async (req, res) => {
  try {
    const cert = await Certificate.findOne({ certificateId: req.params.id });
    
    // Log verification telemetry
    await VerificationLog.create({
      certificateId: req.params.id,
      verificationMethod: "id_search",
      result: cert ? "authentic" : "not_found",
      confidenceScore: cert ? 100 : 0
    });

    if (!cert) {
      return res.status(404).json({ msg: "Certificate not found in official database" });
    }
    
    res.json(cert);
  } catch (err) {
    res.status(500).json({ msg: "Error searching certificate", error: err.message });
  }
});

// 2. OCR Image Certificate Upload & Authenticity Verification (Real vs Fake Detection)
router.post("/verify-image", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No image file provided for scanning" });
  }

  const filePath = req.file.path;
  let worker = null;

  try {
    // Initialize Tesseract OCR Worker
    worker = await createWorker("eng");
    const ret = await worker.recognize(filePath);
    const text = ret.data.text || "";

    // Clean up temporary image file
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    // Extract Certificate ID using regex patterns (e.g. CERT-1001, CERT-XXXX-XXXX, or alphanumeric ID)
    const idRegex = /(CERT[-_ ]?[A-Z0-9]{3,12})/i;
    const match = text.match(idRegex);
    const extractedId = match ? match[1].replace(/ /g, "-").toUpperCase() : null;

    let certRecord = null;
    if (extractedId) {
      certRecord = await Certificate.findOne({ certificateId: extractedId });
    }

    // Fallback: If exact CERT- regex wasn't matched, check if any stored Certificate ID exists inside raw OCR text
    if (!certRecord) {
      const allCerts = await Certificate.find({}, "certificateId studentName domain");
      for (const c of allCerts) {
        if (text.toUpperCase().includes(c.certificateId.toUpperCase())) {
          certRecord = c;
          break;
        }
      }
    }

    let verdict = "not_found";
    let confidenceScore = 0;
    let nameMatch = false;

    if (certRecord) {
      // Check if student name in MongoDB appears in OCR text
      const cleanStudentName = certRecord.studentName.toLowerCase().replace(/[^a-z0-9]/g, "");
      const cleanOcrText = text.toLowerCase().replace(/[^a-z0-9]/g, "");

      if (cleanOcrText.includes(cleanStudentName)) {
        verdict = "authentic";
        confidenceScore = 98;
        nameMatch = true;
      } else {
        // ID exists in DB, but the name on the image doesn't match official student name -> TAMPERED / FORGED
        verdict = "tampered";
        confidenceScore = 45;
      }
    }

    // Save telemetry to MongoDB log
    const log = await VerificationLog.create({
      certificateId: certRecord ? certRecord.certificateId : (extractedId || "UNKNOWN"),
      verificationMethod: "ocr_image",
      result: verdict,
      confidenceScore,
      extractedData: {
        extractedId: certRecord ? certRecord.certificateId : extractedId,
        extractedName: certRecord ? certRecord.studentName : "Unrecognized",
        rawTextSnippet: text.substring(0, 300)
      }
    });

    if (verdict === "authentic") {
      return res.json({
        verdict: "authentic",
        statusText: "VERIFIED REAL CERTIFICATE",
        confidenceScore,
        certificate: certRecord,
        ocrExtracted: {
          idFound: certRecord.certificateId,
          nameFound: certRecord.studentName,
          domain: certRecord.domain
        },
        logId: log._id
      });
    } else if (verdict === "tampered") {
      return res.json({
        verdict: "tampered",
        statusText: "TAMPERED / FORGED CERTIFICATE DETECTED",
        confidenceScore,
        alertReason: `Certificate ID "${certRecord.certificateId}" belongs to "${certRecord.studentName}", but the uploaded image contains altered/inconsistent name details.`,
        officialRecord: certRecord,
        logId: log._id
      });
    } else {
      return res.json({
        verdict: "not_found",
        statusText: "UNREGISTERED / INVALID CERTIFICATE",
        confidenceScore: 0,
        alertReason: extractedId 
          ? `Certificate ID "${extractedId}" was read from image but is not registered in official database.`
          : "Could not locate a valid Certificate ID in the uploaded image scan.",
        rawTextSnippet: text.substring(0, 200),
        logId: log._id
      });
    }
  } catch (err) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.status(500).json({ msg: "AI OCR processing error", error: err.message });
  } finally {
    if (worker) {
      await worker.terminate();
    }
  }
});

// 3. Download Certificate PDF Stream
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

// Student Registration & Automatic Certificate Generation
router.post("/register-student", async (req, res) => {
  try {
    const { name, email, password, domain, startDate, endDate } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all required fields (name, email, password)" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "An account already exists with this email address." });
    }

    // Auto-generate unique Certificate ID
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const certificateId = `CERT-2026-${randomCode}`;

    // Create Certificate record in MongoDB
    const certificate = new Certificate({
      certificateId,
      studentName: name,
      domain: domain || "Full Stack Web Development",
      startDate: startDate ? new Date(startDate) : new Date("2026-01-15"),
      endDate: endDate ? new Date(endDate) : new Date("2026-04-15"),
      issueDate: new Date()
    });
    await certificate.save();

    // Hash password and save Student User
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "student",
      certificateId
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email, role: "student", certificateId },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Student registered successfully & Certificate auto-generated!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: "student",
        certificateId
      },
      certificate
    });
  } catch (err) {
    res.status(500).json({ msg: "Student registration failed", error: err.message });
  }
});

// Get Logged-In Student's Personal Certificate
router.get("/student/me", auth, async (req, res) => {
  try {
    const certId = req.user.certificateId;
    if (!certId) {
      return res.status(404).json({ msg: "No certificate linked to student account." });
    }

    const cert = await Certificate.findOne({ certificateId: certId });
    if (!cert) {
      return res.status(404).json({ msg: "Certificate record not found." });
    }

    res.json(cert);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching student certificate", error: err.message });
  }
});

module.exports = router;
