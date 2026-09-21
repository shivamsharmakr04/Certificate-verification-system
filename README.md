# CertiVerify — Certificate Verification Platform

A full-stack certificate verification system built with React, Node.js, Express, and MongoDB. The application supports certificate issuance, public verification, OCR-assisted image verification, student/admin portals, PDF generation, and verification analytics.

## ✨ Highlights

- 🔎 Certificate verification by unique certificate ID
- 🧠 Tesseract.js OCR-assisted certificate image verification
- 🔐 JWT authentication with role-based access
- 🎓 Student certificate portal and certificate preview
- 🛠️ Admin dashboard with certificate management and analytics
- 📥 Excel, CSV, PDF and image data ingestion
- 📄 Dynamic PDF certificate generation
- 📊 Verification logs and audit telemetry
- 📱 Responsive React UI with Framer Motion

## 🧰 Tech Stack

**Frontend:** React, Vite, React Router, Axios, Framer Motion, Lucide React  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Authentication:** JWT, bcrypt  
**OCR:** Tesseract.js  
**File Processing:** Multer, XLSX, PDF parsing  
**PDF:** PDFKit

## 🏗️ Architecture

```text
React + Vite
     │
     ▼
Express REST API
     │
 ┌───┴───────────────┐
 ▼                   ▼
MongoDB          OCR / Files
     │
     ▼
Verification + Admin Analytics
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB / MongoDB Atlas
- npm

### Installation

```bash
git clone https://github.com/shivamsharmakr04/Certificate-verification-system.git
cd Certificate-verification-system

npm install

cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the backend:

```bash
cd backend
npm start
```

Run the frontend in another terminal:

```bash
npm run dev
```

## 🔐 Security

Authentication uses JWT-based sessions and bcrypt password hashing. Protected routes separate student and administrator functionality.

## 📌 What This Project Demonstrates

- Full-stack application architecture
- REST API development
- Authentication and authorization
- Database design and CRUD operations
- OCR integration
- File/document processing
- Dashboard and analytics development

## 👨‍💻 Author

**Shivam Kumar** — Full-Stack Developer

[GitHub](https://github.com/shivamsharmakr04) · [LinkedIn](https://linkedin.com/in/shivam-kumar-b0aab2209)

---
