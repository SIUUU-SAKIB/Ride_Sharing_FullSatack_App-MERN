# 🚗 Ride Sharing Application

A full-stack ride-sharing platform built with the MERN stack, featuring secure authentication, role-based access control, real-time-ready architecture, and cloud-based media handling.

---

## 🔥 Features

### 👤 User

* Register & login with email verification
* Profile management with image upload (Cloudinary)
* Request rides
* View ride history

### 🚘 Driver

* Apply to become a driver with document uploads (license, NID, vehicle images)
* Application status tracking (pending, approved, rejected)

### 🛡️ Admin Panel

* Role-based access (Super Admin, Admin, Moderator)
* Approve/reject driver applications
* Block or delete admins/users
* Manage system users

---

## 🔐 Authentication & Security

* JWT-based authentication (access & refresh tokens)
* Email verification system with token expiry
* Password hashing using bcrypt
* Login attempt limiting & account lock system
* Role-based authorization (RBAC)

---

## ☁️ File Upload System

* Cloudinary integration
* Multiple image uploads (driver documents)
* Secure storage with public_id for future management

---

## 🧠 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* TypeScript

### Authentication & Security

* JWT (JSON Web Tokens)
* bcrypt
* Zod (validation)

### File Handling

* Multer
* Cloudinary

---

## 📁 Project Structure

```
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

---

## 🚀 API Highlights

### Auth

* `POST /auth/login`
* `GET /auth/verify-email`
* `POST /auth/resend-verification`

### User

* `POST /users/register`
* `GET /users/profile`

### Driver

* `POST /driver/apply`
* `GET /driver/status`

### Admin

* `POST /admin/create`
* `PATCH /admin/block/:id`
* `DELETE /admin/delete/:id`

---

## ⚙️ Environment Variables

Create a `.env` file:

```
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

## 🛠️ Installation & Setup

```bash
# Clone the repo
git clone https://github.com/your-username/ride-sharing-app.git

# Navigate to project
cd ride-sharing-app

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 📌 Future Improvements

* Real-time ride tracking (Socket.io)
* Payment integration
* Rating & review system
* Ride matching algorithm
* Mobile app integration

---

## 👨‍💻 Author

**Sakib Islam**
Full-stack developer focused on building scalable backend systems

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
