const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const Certificate = require("../models/Certificate");
const Admin = require("../models/Admin");
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

// Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter email and password" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Invalid email or password" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ msg: "Invalid email or password" });

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { name: admin.name || "Admin User", email: admin.email, role: "admin" }
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error during login", error: err.message });
  }
});

// Upload Student Data via Excel Bulk Upload
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const filePath = req.file.path;
  try {
    const data = readExcel(filePath);

    if (!data || data.length === 0) {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return res.status(400).json({ msg: "No valid rows found in Excel sheet" });
    }

    // Execute bulk upsert operations to handle existing certificates cleanly
    const bulkOps = data.map((item) => ({
      updateOne: {
        filter: { certificateId: item.certificateId },
        update: { $set: item },
        upsert: true
      }
    }));

    const result = await Certificate.bulkWrite(bulkOps);

    // Clean up temporary file
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.json({
      msg: "Data uploaded successfully",
      totalProcessed: data.length,
      insertedCount: result.upsertedCount || 0,
      modifiedCount: result.modifiedCount || 0
    });
  } catch (err) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.status(500).json({ msg: "Error processing Excel file", error: err.message });
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

module.exports = router;
