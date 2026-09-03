# 🛡️ CertiVerify - AI-Powered Internship Certificate Verification System

[![Stack](https://img.shields.io/badge/Stack-MERN%20(MongoDB%2C%20Express%2C%20React%2C%20Node)-6366f1?style=for-the-badge)](https://github.com/)
[![React](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-61dafbaa?style=for-the-badge)](https://react.dev/)
[![AI OCR](https://img.shields.io/badge/AI%20OCR-Tesseract.js-34d399?style=for-the-badge)](https://tesseract.projectnaptha.com/)
[![License](https://img.shields.io/badge/License-MIT-06b6d4?style=for-the-badge)](LICENSE)

**CertiVerify** is a full-stack, AI-powered Web Application built on the **MERN Stack** designed to streamline the issuance, verification, and tamper detection of internship credentials. It allows administrators to import student records in bulk via **Excel, PDF, or Images**, automatically provisions unique certificate records upon student registration, and enables employers/verifiers to instantly validate credentials using **Certificate ID searches** or **AI OCR Image Scans**.

---

## 📸 Short Description for GitHub About Box

> **CertiVerify** is an AI-powered MERN stack platform for instant internship certificate issuance, bulk multi-format data imports (Excel, PDF, Images), printable PDF streaming, and automated Tesseract OCR real vs. fake fraud detection.

---

## ✨ Key Features

### 🎓 1. Student Portal & Automatic Certificate Generation
- **Auto-Provisioning on Registration:** When students sign up, the system automatically generates a unique, cryptographic Certificate ID (e.g. `CERT-2026-X8Y9`) and creates an official MongoDB certificate record.
- **Personal Dashboard:** Students can view their 3D glassmorphic certificate preview, copy their unique ID, and stream printable, high-resolution vector PDF downloads.

### 👁️ 2. AI OCR Image Scanner (Real vs. Fake Fraud Detection)
- **Image Text Recognition:** Verifiers can drag & drop scanned certificate images (`.png`, `.jpg`, `.jpeg`). Backend Tesseract.js OCR extracts text automatically.
- **Tamper Detection Engine:** Compares extracted student names and certificate IDs against MongoDB database records. Flags photo-edited or forged certificates with confidence match percentages and **`TAMPERED / FORGED DETECTED`** warnings.

### 📥 3. Multi-Format Admin Bulk Data Ingestion
- **Flexible Data Imports:** Administrators can upload student records in 3 formats:
  - **Excel / CSV Sheets:** (`.xlsx`, `.xls`, `.csv`) parsed with automated column header normalization.
  - **PDF Documents:** (`.pdf`) parsed via `pdf-parse` text extraction.
  - **Certificate Images:** (`.png`, `.jpg`) parsed via AI OCR.
- **Bulk UPSERT Operations:** Prevents data corruption and duplicate record conflicts using MongoDB `bulkWrite`.

### 📊 4. Real-Time Telemetry & Admin Analytics
- **Live Metric KPIs:** Tracks total active certificates, total search/scan attempts, verified real ratio, and blocked forged attempts.
- **Real-Time Audit Stream:** Displays live telemetry logs for every search and image scan with timestamped verification verdicts (`AUTHENTIC`, `TAMPERED`, `NOT_FOUND`).

### 🎨 5. Obsidian Glassmorphism UI & SPA Performance
- **Modern Design System:** Dark space glassmorphism (`#080c14` / `#0f172a`), glowing accents, micro-animations (`framer-motion`), and responsive design across desktop, tablet, and mobile.
- **Single Page Application (SPA):** Seamless client-side routing via React Router without page reloads.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend** | React 19, Vite, Framer Motion, Lucide React Icons, Axios, Vanilla CSS Glassmorphism |
| **Backend** | Node.js, Express.js, JWT, BcryptJS, Multer |
| **Database** | MongoDB (Mongoose ORM) |
| **AI / OCR** | Tesseract.js (Optical Character Recognition) |
| **PDF Generation & Parsing** | PDFKit (Vector PDF rendering), PDF-Parse, XLSX |

---

## 📁 Repository Folder Structure

```
certificate_verification_system/
├── backend/
│   ├── config/
│   ├── middleware/
│   │   └── authMiddleware.js        # Bearer JWT verification
│   ├── models/
│   │   ├── Admin.js                 # Admin user schema
│   │   ├── User.js                  # Student & user account schema
│   │   ├── Certificate.js           # Certificate records schema
│   │   └── VerificationLog.js       # Real-time audit telemetry log
│   ├── routes/
│   │   ├── adminRoutes.js           # Admin login, multi-format upload, analytics
│   │   └── certificateRoutes.js     # Public verify, AI OCR image scan, student reg
│   ├── utils/
│   │   └── excelUpload.js           # Header normalizer & excel parser
│   ├── .env                         # Server port, MONGO_URI, JWT_SECRET
│   ├── package.json
│   └── server.js                    # Express app & DB connection
├── src/
│   ├── assets/                      # Page-specific CSS modules
│   ├── component/
│   │   ├── admin/                   # Dashboard, MultiFormatUpload, StudentTable
│   │   ├── certificate/             # CertificateTemplate, DownloadButton
│   │   ├── Navbar.jsx               # Dynamic role-based navigation bar
│   │   ├── Footer.jsx               # Responsive SPA footer
│   │   ├── AdminRoute.jsx           # Protected route for Admin
│   │   └── StudentRoute.jsx         # Protected route for Student
│   ├── context/
│   │   └── Authcontext.jsx          # User authentication state provider
│   ├── pages/
│   │   ├── Home.jsx                 # Hero section, quick search widget, AI OCR preview
│   │   ├── About.jsx                # Platform mission & workflow diagram
│   │   ├── Contact.jsx              # Support form & contact details
│   │   ├── Login.jsx                # Unified Login (Admin & Student)
│   │   ├── Register.jsx             # Role-toggle Student / Admin signup
│   │   ├── Verify.jsx               # Dual-mode verification portal (ID & AI OCR)
│   │   ├── StudentDashboard.jsx     # Student personal certificate portal
│   │   └── AdminDashboard.jsx       # Admin control center
│   ├── services/
│   │   └── api.js                   # Axios instance with Bearer interceptor
│   ├── App.jsx                      # Router configuration
│   └── index.css                    # Master glassmorphism CSS design system
├── README.md
└── package.json
```

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local Community Server or MongoDB Atlas cluster)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/certificate-verification-system.git
cd certificate-verification-system
```

### 2. Configure Backend Environment Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/certificate_db
JWT_SECRET=supersecretkey_certiverify_2026
```

### 3. Install Dependencies
```bash
# Install root (frontend) dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 4. Start the Application
In separate terminal windows, run the backend and frontend servers:

**Terminal 1 (Backend Express Server):**
```bash
cd backend
npm start
```
*Server will start on `http://localhost:5000` connected to MongoDB.*

**Terminal 2 (Frontend Vite Server):**
```bash
npm run dev
```
*App will open in your browser at `http://localhost:5173`.*

---

## 📡 API Endpoints Overview

### Public & Student Endpoints (`/api/certificate`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/certificate/verify/:id` | Search certificate by ID |
| `POST` | `/api/certificate/verify-image` | Scan image via AI OCR & verify real vs. fake |
| `POST` | `/api/certificate/register-student` | Register student & auto-generate certificate |
| `GET` | `/api/certificate/student/me` | Fetch logged-in student's certificate |
| `GET` | `/api/certificate/download/:id` | Stream vector PDF certificate download |

### Admin Endpoints (`/api/admin`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/admin/login` | Unified Login endpoint (Admin & Student) |
| `POST` | `/api/admin/register` | Register new Admin account |
| `POST` | `/api/admin/upload` | Bulk Multi-Format Upload (Excel, PDF, Image OCR) |
| `GET` | `/api/admin/certificates` | Fetch all student certificate records |
| `DELETE` | `/api/admin/certificates/:id` | Delete certificate record |
| `GET` | `/api/admin/analytics` | Fetch real-time telemetry metrics & audit logs |

---

## 👤 Default Administrator Credentials

Upon first launching the system, default administrator credentials auto-seed automatically:
- **Email:** `admin@certiverify.com`
- **Password:** `admin123`

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
