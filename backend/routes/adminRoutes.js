const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Certificate = require("../models/Certificate");
const Admin = require("../models/Admin");
const auth = require("../middleware/authMiddleware");
const readExcel = require("../utils/excelUpload");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const admin = new Admin({ email: req.body.email, password: hashed });
  await admin.save();
  res.json({ msg: "Admin created" });
});

router.post("/login", async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

  const match = await bcrypt.compare(req.body.password, admin.password);
  if (!match) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ token });
});

router.post("/upload", auth, upload.single("file"), async (req, res) => {
  const data = readExcel(req.file.path);
  await Certificate.insertMany(data);
  res.json({ msg: "Data uploaded successfully" });
});

module.exports = router;
