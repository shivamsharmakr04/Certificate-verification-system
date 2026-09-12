# 🛡️ CertiVerify - AI-Powered Internship Certificate Verification & Fraud Detection System

[![MERN Stack](https://img.shields.io/badge/Stack-MERN%20(MongoDB%2C%20Express%2C%20React%2C%20Node)-6366f1?style=for-the-badge&logo=mongodb)](https://github.com/)
[![React 19](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-61dafbaa?style=for-the-badge&logo=react)](https://react.dev/)
[![AI OCR](https://img.shields.io/badge/AI%20OCR-Tesseract.js-34d399?style=for-the-badge)](https://tesseract.projectnaptha.com/)
[![Security](https://img.shields.io/badge/Security-JWT%20%2B%20Bcrypt-f43f5e?style=for-the-badge&logo=jsonwebtokens)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-06b6d4?style=for-the-badge)](LICENSE)

**CertiVerify** is an enterprise-grade, AI-powered **MERN Stack** Web Application engineered for seamless issuance, instant verification, vector PDF generation, and real-time fraud detection of internship certificates.

Designed with an **Obsidian Dark Glassmorphism** aesthetic, CertiVerify provides a dual-portal experience:
1. **Verifiers & Public:** Instantly validate credentials via **Cryptographic Certificate IDs** or drag-and-drop **AI OCR Image Scans** that detect photo-edited or tampered certificates with automated confidence matching.
2. **Students:** Sign up to receive auto-provisioned unique certificate IDs, preview interactive 3D credentials, and stream high-resolution vector PDF downloads.
3. **Administrators:** Ingest bulk student data in multi-formats (**Excel, CSV, PDF, OCR Images**), manage certificate records, monitor real-time telemetry audit logs, and track system KPIs.

---

## 📸 GitHub Summary / About Box

> **CertiVerify** is an AI-powered MERN stack platform for instant internship certificate issuance, multi-format bulk imports (Excel, PDF, Images), vector PDF streaming, and automated Tesseract OCR real-vs-fake fraud detection with live telemetry audit logs.

---

## ✨ Core Features & Highlights

### 👁️ 1. AI OCR Fraud & Tamper Detection Engine
- **Client & Server Image Scans:** Supports `.png`, `.jpg`, and `.jpeg` certificate uploads.
- **Tesseract.js OCR Pipeline:** Parses raw optical character text from image scans to identify Certificate IDs (`CERT-XXXX-XXXX`) and student details.
- **Bi-directional Verification:** Cross-checks parsed credentials against the official MongoDB database.
- **Authenticity Verdicts & Confidence Scores:**
  - 🟢 **`VERIFIED REAL CERTIFICATE`** (98% Confidence): Certificate ID exists AND student name matches official record.
  - 🔴 **`TAMPERED / FORGED CERTIFICATE DETECTED`** (45% Confidence): Certificate ID exists, but name on image fails matching against database (flags photo-edited credentials).
  - 🟡 **`UNREGISTERED / INVALID CERTIFICATE`** (0% Confidence): Certificate ID does not exist in official database.

### 🎓 2. Student Portal & Auto-Provisioning
- **Automatic ID Generation:** Upon student registration, the backend automatically generates a unique cryptographic ID (e.g. `CERT-2026-X8Y9`) and persists a certificate record.
- **Live 3D Glassmorphic Preview:** Interactive certificate card displaying domain, issue date, duration, and verification badge.
- **Vector PDF Download Streamer:** Generates landscape A4 vector PDFs on-the-fly via `PDFKit` with custom borders and authorized signature lines.

### 📥 3. Multi-Format Admin Data Ingestion
- **Excel & CSV Sheet Upload:** (`.xlsx`, `.xls`, `.csv`) with flexible header normalization (`readExcel` utility maps column aliases like "Student Name", "Cert ID", "Domain", etc.).
- **PDF Document Import:** (`.pdf`) using `pdf-parse` for text extraction.
- **Image OCR Import:** (`.png`, `.jpg`) converting single certificate images directly into database records.
- **Bulk UPSERT Operations:** Uses MongoDB `bulkWrite` with `upsert: true` to prevent duplicate record conflicts and allow safe batch updates.

### 📊 4. Real-Time Telemetry & Admin Analytics
- **Live Metric KPIs:** Tracks total active certificates, total verification checks, authentic ratio %, and tampered/forged blocked attempts.
- **Audit Telemetry Stream:** Logs every verification request (`id_search` or `ocr_image`) into the `VerificationLog` collection with timestamp, result, confidence score, and extracted raw text snippets.

### 🎨 5. Obsidian Glassmorphism UI & SPA Performance
- **Design Tokens:** Dark space palette (`#080c14` / `#0f172a`), neon glowing accents, micro-animations powered by `framer-motion`, and Lucide icons.
- **Single Page Application:** React 19 + React Router v7 with zero full page reloads and smooth route transitions.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend Framework** | React 19, Vite | Fast HMR SPA with `rolldown-vite` |
| **Routing & State** | React Router v7, AuthContext | Context API with JWT local storage persistence |
| **Animations & Icons** | Framer Motion, Lucide React | Hardware-accelerated UI transitions and SVG icons |
| **Styling** | Modular Vanilla CSS | Dark Glassmorphism, CSS variables, backdrop filters |
| **Backend Runtime** | Node.js, Express.js | Express v5 REST API |
| **Database** | MongoDB, Mongoose ORM | Document database with schemas for Users, Certs, & Telemetry Logs |
| **Authentication** | JWT, BcryptJS | Bearer token authentication & salted password hashing |
| **AI / OCR Engine** | Tesseract.js | In-memory Tesseract worker (`eng` language pack) |
| **File Handling & Parsing** | Multer, XLSX, PDF-Parse | Multi-format upload handler & file parsers |
| **PDF Generation** | PDFKit | On-the-fly vector PDF binary stream creation |

---

## 📂 Project Architecture & File Directory

```
certificate_verification_system/
├── backend/
│   ├── config/                      # Database configuration
│   ├── middleware/
│   │   └── authMiddleware.js        # Bearer JWT verification & role validation
│   ├── models/
│   │   ├── Admin.js                 # Admin user schema
│   │   ├── User.js                  # Student & user account schema
│   │   ├── Certificate.js           # Official certificate records schema
│   │   └── VerificationLog.js       # Real-time audit telemetry log schema
│   ├── routes/
│   │   ├── adminRoutes.js           # Auth, multi-format upload, cert CRUD, analytics
│   │   └── certificateRoutes.js     # Public verify, AI OCR scan, student signup, PDF stream
│   ├── utils/
│   │   └── excelUpload.js           # Flexible header normalizer & excel parser
│   ├── uploads/                     # Temporary upload directory for Multer
│   ├── .env                         # Server environment variables (PORT, MONGO_URI, JWT_SECRET)
│   ├── package.json
│   └── server.js                    # Express app initialization & DB connection
├── src/
│   ├── assets/                      # Modular CSS stylesheets for pages & components
│   │   ├── About.css
│   │   ├── AdminDashboard.css
│   │   ├── AlertMessage.css
│   │   ├── Auth.css
│   │   ├── Contact.css
│   │   ├── Footer.css
│   │   ├── Home.css
│   │   ├── LoadingSpinner.css
│   │   └── verify.css
│   ├── component/
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx        # Admin KPI cards & telemetry log table
│   │   │   ├── Excelupload.jsx      # Multi-format data import component
│   │   │   └── Studenttable.jsx     # Active certificates table with search & delete
│   │   ├── certificate/
│   │   │   ├── Certificatetemplate.jsx # 3D glassmorphic certificate UI card
│   │   │   └── Downloadbutton.jsx   # Vector PDF stream download trigger
│   │   ├── AdminRoute.jsx           # Protected route guard for Admin
│   │   ├── StudentRoute.jsx         # Protected route guard for Student
│   │   ├── Alertmessage.jsx         # Custom animated alert banners
│   │   ├── Loadingspinner.jsx       # Custom glass spinner
│   │   ├── Navbar.jsx               # Role-aware dynamic top navigation
│   │   └── Footer.jsx               # Site footer with platform links
│   ├── context/
│   │   └── Authcontext.jsx          # Auth provider handling user sessions & JWT
│   ├── pages/
│   │   ├── Home.jsx                 # Hero, quick search widget, AI OCR preview, trust stats
│   │   ├── Verify.jsx               # Dual-mode verification portal (ID search & AI OCR scan)
│   │   ├── About.jsx                # Platform workflow, mission & security architecture
│   │   ├── Contact.jsx              # Support contact form & FAQ accordion
│   │   ├── Login.jsx                # Unified Login portal (Admin & Student)
│   │   ├── Register.jsx             # Dual signup (Student auto-cert & Admin)
│   │   ├── StudentDashboard.jsx     # Student certificate hub
│   │   └── AdminDashboard.jsx       # Admin management hub
│   ├── services/
│   │   └── api.js                   # Axios client with JWT request interceptor
│   ├── App.jsx                      # Client router setup & route declarations
│   ├── index.css                    # Glassmorphism design system & utility classes
│   └── main.jsx                     # React DOM root entry point
├── package.json                     # Frontend dependencies & scripts
├── vite.config.js                   # Vite configuration
└── README.md                        # Documentation
```

---

## ⚡ Quick Start & Installation Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017/`) or MongoDB Atlas URI

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/certificate-verification-system.git
cd certificate-verification-system
```

### 2. Configure Backend Environment
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/certificate_db
JWT_SECRET=certiverify_super_secret_jwt_key_2026
```

### 3. Install Dependencies

**Install Frontend Dependencies:**
```bash
npm install
```

**Install Backend Dependencies:**
```bash
cd backend
npm install
cd ..
```

### 4. Run Development Servers

**Option A: Run Backend & Frontend in Separate Terminals**

- **Terminal 1 (Backend API Server):**
  ```bash
  cd backend
  npm start
  ```
  *(Server runs on `http://localhost:5000`)*

- **Terminal 2 (Frontend Client):**
  ```bash
  npm run dev
  ```
  *(Vite app opens on `http://localhost:5173`)*

---

## 🔑 Default Administrator Credentials

Upon first launching the system, default administrator credentials auto-seed automatically when logging in with these details:

- **Email:** `admin@certiverify.com`
- **Password:** `admin123`
- **Role:** System Administrator

---

## 📡 API Reference & Endpoints

### 🟢 Public & Student Routes (`/api/certificate`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/certificate/:id` | Public | Search certificate by unique ID & log telemetry |
| `POST` | `/api/certificate/verify-image` | Public | Scan certificate image using AI OCR & perform fraud check |
| `POST` | `/api/certificate/register-student` | Public | Register student account & auto-issue certificate ID |
| `GET` | `/api/certificate/student/me` | Student | Fetch logged-in student's personal certificate |
| `GET` | `/api/certificate/download/:id` | Public | Stream vector landscape PDF download |

### 🔵 Admin Routes (`/api/admin`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/admin/login` | Public | Unified login for Admin & Student accounts |
| `POST` | `/api/admin/register` | Public | Register new Admin account |
| `POST` | `/api/admin/upload` | Admin | Multi-format bulk upload (Excel, CSV, PDF, Images) |
| `GET` | `/api/admin/certificates` | Admin | Retrieve all student certificate records |
| `DELETE` | `/api/admin/certificates/:id` | Admin | Delete student certificate by ID |
| `GET` | `/api/admin/analytics` | Admin | Fetch system analytics KPIs & real-time telemetry logs |

---

## 🔒 Security & Verification Workflow

```
                        +----------------------------+
                        |  User Uploads Scan Image   |
                        +--------------+-------------+
                                       |
                                       v
                        +----------------------------+
                        |  Tesseract.js OCR Engine   |
                        | (Extracts ID & Student Name)|
                        +--------------+-------------+
                                       |
                                       v
                        +----------------------------+
                        | MongoDB Database Lookup    |
                        | (Search by Certificate ID) |
                        +--------------+-------------+
                                       |
                   +-------------------+-------------------+
                   |                                       |
        [Record Not Found]                            [Record Found]
                   |                                       |
                   v                                       v
      🟡 Verdict: UNREGISTERED                 Does OCR Name match DB Name?
      Score: 0% Confidence                                 |
                                             +-------------+-------------+
                                             |                           |
                                           [YES]                        [NO]
                                             |                           |
                                             v                           v
                                🟢 Verdict: AUTHENTIC       🔴 Verdict: TAMPERED
                                Score: 98% Confidence       Score: 45% Confidence
```

---

## 📜 License

This project is licensed under the **MIT License**. Feel free to modify and distribute.

