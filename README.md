# 🏡 RentNest - Full-Stack House Rental & Property Management Platform

RentNest is a full-stack web application that allows property owners to list rental accommodations and enables tenants/renters to discover, search, and save property listings. 

Built originally as a PHP/MySQL solution and modernized into a scalable full-stack MERN (MySQL/Node/Express/React) deployment using distributed cloud infrastructure.

---

## 🌐 Live Application & API

* **Live Frontend:** [https://intern-nw.vercel.app](https://intern-nw.vercel.app)
* **Live Backend API:** `https://rentnest-8vej.onrender.com`
* **Database Platform:** TiDB Cloud (Serverless Cloud MySQL)

---

## ✨ Features

* **User Authentication & Authorization:**
  * Secure Signup and Login functionality.
  * Role-based flow for **Property Owners** and **Tenants**.
  * JWT (JSON Web Token) based session handling with password hashing (`bcrypt`).
* **Property Management:**
  * Owners can publish rental listings with location, rent pricing, amenities, and descriptions.
  * Manage and update active property listings.
* **Property Discovery & Wishlist:**
  * Search and filter available rental listings.
  * Save/Bookmark favorite properties (`saved_properties` relation).
* **Responsive UI:**
  * Fast frontend rendering built with React and Vite.

---

## 🛠️ Tech Stack

### Frontend
* **Core:** React.js, Vite
* **HTTP Client:** Axios
* **Styling & Assets:** Modern CSS3, HTML5

### Backend
* **Runtime & Framework:** Node.js, Express.js
* **Database Driver:** `mysql2`
* **Authentication & Security:** `jsonwebtoken`, `bcrypt`
* **Environment Configuration:** `dotenv`, `cors`

### Database & Deployment
* **Database:** Cloud MySQL (TiDB Cloud Serverless)
* **Frontend Hosting:** Vercel
* **Backend Hosting:** Render

---

## 💻 How to Run Locally (Local Setup Guide)

## ⚙️ Software Prerequisites

Project ko local machine par run karne ke liye pehle se yeh software installed hone chahiye:

1. **[Node.js](https://nodejs.org/)** (v18.0.0 ya higher)
2. **[Git](https://git-scm.com/)**
3. **[XAMPP Server](https://www.apachefriends.org/)** / **[MySQL Workbench](https://www.mysql.com/products/workbench/)**
4. **[VS Code](https://code.visualstudio.com/)**

---

## 🚀 How to Run This Project Locally

### Step 1: Clone the Repository
Terminal open karke project clone karein:
- command: `git clone https://github.com/divyanshitailor/intern_nw`
- command: `cd intern_nw`

### Step 2: Local Database Setup
1. XAMPP Control Panel open karke MySQL start karein.
2. MySQL query run karke database banayein: `CREATE DATABASE rentnest_db;`
3. Repository mein maujood SQL file ko `rentnest_db` database mein import karein.

### Step 3: Backend Setup & Run (Root Folder)
1. Project ke main root folder (`intern_nw`) mein rahein.
2. Dependencies install karein: `npm install`
3. Root folder par `.env` file banayein aur yeh text add karein:
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=rentnest_db
   DB_PORT=3306
   JWT_SECRET=supersecretkey123
4. Backend server start karein: `node server.js`

### Step 4: Frontend Setup & Run (`rentnest-frontend`)
1. Naya terminal open karke frontend directory mein jayein: `cd rentnest-frontend`
2. Dependencies install karein: `npm install`
3. `rentnest-frontend` folder mein `.env` file banayein aur add karein:
   VITE_API_BASE_URL=http://localhost:5000
4. Frontend dev server run karein: `npm run dev`
5. Browser mein open karein: `http://localhost:5173`

---

## 📊 Database Schema Overview

The relational database consists of 3 core tables:
* `users` — Stores user profiles, credentials, and roles (`owner` / `tenant`).
* `properties` — Stores listing details, location, pricing, and owner associations.
* `saved_properties` — Maps bookmarked listings to user accounts.

---

