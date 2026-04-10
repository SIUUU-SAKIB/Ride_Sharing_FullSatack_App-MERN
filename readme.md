# 🚗 Ride Sharing Application

<p align="center">
  <img src="https://img.shields.io/badge/Backend-Node.js-green" />
  <img src="https://img.shields.io/badge/Framework-Express-black" />
  <img src="https://img.shields.io/badge/Database-MongoDB-green" />
  <img src="https://img.shields.io/badge/Language-TypeScript-blue" />
  <img src="https://img.shields.io/badge/Auth-JWT-orange" />
</p>

<p align="center">
  A scalable, production-inspired ride-sharing backend system with authentication, RBAC, and cloud integrations.
</p>

---

## ✨ Overview

This project is designed to simulate a **real-world ride-sharing platform backend**, focusing on:

* Scalable architecture
* Secure authentication
* Role-based system control
* Cloud-based file handling

> Built with a strong emphasis on **clean code, modular design, and production practices**

---

## 🎯 Core Features

### 🔐 Authentication & Security

* JWT authentication (Access + Refresh Tokens)
* Email verification with token expiry
* Password hashing using bcrypt
* Login attempt limiting & account lock system
* Secure token handling (hashed verification tokens)

---

### 🛡️ Role-Based Access Control (RBAC)

| Role        | Permissions            |
| ----------- | ---------------------- |
| Super Admin | Full system control    |
| Admin       | Manage drivers & users |
| Moderator   | Limited control        |
| User        | Ride features          |

---

### 👤 User System

* Register & login with email verification
* Profile with Cloudinary image upload
* Ride request system
* Ride history tracking

---

### 🚘 Driver System

* Driver application with:

  * License upload
  * NID upload
  * Vehicle images
* Multi-image upload support
* Application lifecycle:

  * Pending → Approved → Rejected

---

### ☁️ Cloud Integration

* Cloudinary for media storage
* Multiple image upload support
* Stores `url + public_id` for asset management

---

## 🧠 System Architecture

```id="elite001"
Client
   ↓
API Layer (Express)
   ↓
Auth Module → RBAC Middleware
   ↓
Service Layer (Business Logic)
   ↓
Database (MongoDB)
```

---

## 🧩 Modular Structure

```id="elite002"
src/
 ├── app/
 │   ├── config/
 │   ├── middleware/
 │   ├── modules/
 │   │   ├── AUTH/
 │   │   ├── ADMIN/
 │   │   ├── USER/
 │   │   ├── DRIVER/
 │   │   ├── RIDES/
 │   ├── utils/
 ├── app.ts
 ├── server.ts
```

> Each module follows a **controller → service → model → validation pattern**

---

## 🔐 Authentication Flow

```id="elite003"
Register → Email Token → Verify → Login → JWT Issued
```

* Token expires after defined time
* Only verified users can login
* Role embedded inside JWT

---

## 📡 API Endpoints (Sample)

### Auth

```id="elite004"
POST /auth/login
GET  /auth/verify-email
POST /auth/resend-verification
```

### Driver

```id="elite005"
POST /driver/apply
GET  /driver/status
```

### Admin

```id="elite006"
POST   /admin/create
PATCH  /admin/block/:id
DELETE /admin/delete/:id
```

---

## ⚙️ Environment Variables

```id="elite007"
PORT=5000
DATABASE_URL=your_mongodb_uri

JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

FRONTEND_URL=http://localhost:3000
```

---

## 🛠️ Setup

```bash id="elite008"
git clone https://github.com/your-username/ride-sharing-app.git
cd ride-sharing-app
npm install
npm run dev
```

---

## 📈 Future Enhancements

* 📍 Real-time ride tracking (Socket.io)
* 💳 Payment integration (Stripe)
* ⭐ Rating & review system
* 🧠 Smart ride matching algorithm
* 📱 Mobile application support

---

## 👨‍💻 Author

**Sakib Islam**
Backend-focused developer building scalable systems

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐
