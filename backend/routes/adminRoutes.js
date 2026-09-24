const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const Certificate = require("../models/Certificate");
const Admin = require("../models/Admin");
const User = require("../models/User");
const VerificationLog = require("../models/VerificationLog");
const auth = require("../middleware/authMiddleware");
const readExcel = require("../utils/excelUpload");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Register Admin Account
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all required fields" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin user already exists with this email" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashed, name: name || "Admin User" });
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Admin created successfully",
      token,
      user: { name: admin.name || "Admin User", email: admin.email, role: "admin" }
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error during registration", error: err.message });
  }
});

// Unified Login Endpoint (Admin & Student)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter email and password" });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Check in Admin Collection
    let admin = await Admin.findOne({ email: cleanEmail });

    // Auto-seed default admin if logging in with default credentials and not yet created
    if (!admin && cleanEmail === "admin@certiverify.com" && password === "admin123") {
      const hashed = await bcrypt.hash("admin123", 10);
      admin = new Admin({ email: "admin@certiverify.com", password: hashed, name: "System Administrator" });
      await admin.save();
    }

    if (admin) {
      const match = await bcrypt.compare(password, admin.password);
      if (match) {
        const token = jwt.sign(
          { id: admin._id, email: admin.email, role: "admin" },
          process.env.JWT_SECRET || "supersecretkey",
          { expiresIn: "7d" }
        );
        return res.json({
          token,
          user: { name: admin.name || "Admin User", email: admin.email, role: "admin" }
        });
      }
    }

    // 2. Check in User Collection (Student / User Accounts)
    const userAccount = await User.findOne({ email: cleanEmail });
    if (userAccount) {
      const match = await bcrypt.compare(password, userAccount.password);
      if (match) {
        const role = userAccount.role || "student";
        const token = jwt.sign(
          { id: userAccount._id, email: userAccount.email, role, certificateId: userAccount.certificateId },
          process.env.JWT_SECRET || "supersecretkey",
          { expiresIn: "7d" }
        );
        return res.json({
          token,
          user: {
            name: userAccount.name,
            email: userAccount.email,
            role,
            certificateId: userAccount.certificateId
          }
        });
      }
    }

    return res.status(400).json({ msg: "Invalid email or password" });
  } catch (err) {
    res.status(500).json({ msg: "Server error during login", error: err.message });
  }
});

// Upload Student Data via Multi-Format Upload (Excel, PDF, Image)
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const filePath = req.file.path;
  const originalName = (req.file.originalname || "").toLowerCase();

  try {
    let records = [];

    // 1. Image File Parsing (OCR)
    if (originalName.endsWith(".png") || originalName.endsWith(".jpg") || originalName.endsWith(".jpeg")) {
      const { data: { text } } = await Tesseract.recognize(filePath, "eng");
      const idMatch = text.match(/(CERT[-_ ]?[A-Z0-9]{3,12})/i);
      const nameMatch = text.match(/(?:Name|Student|Issued To):\s*([A-Za-z ]+)/i);
      const domainMatch = text.match(/(?:Domain|Field|Specialization):\s*([A-Za-z ]+)/i);

      if (!idMatch || !nameMatch) {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return res.status(400).json({ msg: "Could not extract authentic Certificate ID or Student Name from the scanned image." });
      }

      records.push({
        certificateId: idMatch[1].replace(/ /g, "-").toUpperCase(),
        studentName: nameMatch[1].trim(),
        domain: domainMatch ? domainMatch[1].trim() : "General Internship",
        issueDate: new Date()
      });
    }
    // 2. PDF File Parsing
    else if (originalName.endsWith(".pdf")) {
      const dataBuffer = fs.readFileSync(filePath);
      const parsedPdf = await pdfParse(dataBuffer);
      const text = parsedPdf.text || "";

      // Extract details from PDF text
      const idMatch = text.match(/(CERT[-_ ]?[A-Z0-9]{3,12})/i);
      const nameMatch = text.match(/(?:Name|Student):\s*([A-Za-z ]+)/i);
      const domainMatch = text.match(/(?:Domain|Field):\s*([A-Za-z ]+)/i);

      if (!idMatch || !nameMatch) {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return res.status(400).json({ msg: "Could not extract authentic Certificate ID or Student Name from the PDF document." });
      }

      records.push({
        certificateId: idMatch[1].replace(/ /g, "-").toUpperCase(),
        studentName: nameMatch[1].trim(),
        domain: domainMatch ? domainMatch[1].trim() : "General Internship",
        issueDate: new Date()
      });
    } 
    // 3. Excel & CSV File Parsing
    else {
      records = readExcel(filePath);
    }

    if (!records || records.length === 0) {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return res.status(400).json({ msg: "No valid certificate records found in uploaded file." });
    }

    // Execute bulk upsert operations
    const bulkOps = records.map((item) => ({
      updateOne: {
        filter: { certificateId: item.certificateId },
        update: { $set: item },
        upsert: true
      }
    }));

    const result = await Certificate.bulkWrite(bulkOps);

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.json({
      msg: `Data processed successfully from ${req.file.originalname}!`,
      totalProcessed: records.length,
      insertedCount: result.upsertedCount || 0,
      modifiedCount: result.modifiedCount || 0
    });
  } catch (err) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.status(500).json({ msg: "Error processing uploaded file", error: err.message });
  }
});

// Get All Certificate Records for Admin Table
router.get("/certificates", auth, async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ issueDate: -1 });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching student certificates", error: err.message });
  }
});

// Delete Certificate Record by ID
router.delete("/certificates/:id", auth, async (req, res) => {
  try {
    const deleted = await Certificate.findOneAndDelete({ certificateId: req.params.id });
    if (!deleted) {
      return res.status(404).json({ msg: "Certificate record not found" });
    }
    res.json({ msg: "Certificate deleted successfully", certificateId: req.params.id });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting certificate", error: err.message });
  }
});

// Get Real-Time System Analytics & Telemetry Metrics
router.get("/analytics", auth, async (req, res) => {
  try {
    const totalCertificates = await Certificate.countDocuments();
    const totalVerifications = await VerificationLog.countDocuments();
    const authenticVerifications = await VerificationLog.countDocuments({ result: "authentic" });
    const tamperedVerifications = await VerificationLog.countDocuments({ result: "tampered" });
    const notFoundVerifications = await VerificationLog.countDocuments({ result: "not_found" });

    const recentLogs = await VerificationLog.find()
      .sort({ timestamp: -1 })
      .limit(10);

    const ocrCount = await VerificationLog.countDocuments({ verificationMethod: "ocr_image" });
    const searchCount = await VerificationLog.countDocuments({ verificationMethod: "id_search" });

    res.json({
      totalCertificates,
      totalVerifications,
      authenticCount: authenticVerifications,
      tamperedCount: tamperedVerifications,
      notFoundCount: notFoundVerifications,
      ocrScanCount: ocrCount,
      searchQueryCount: searchCount,
      authenticPercentage: totalVerifications > 0 
        ? Math.round((authenticVerifications / totalVerifications) * 100) 
        : 100,
      recentLogs
    });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching analytics data", error: err.message });
  }
});

module.exports = router;
