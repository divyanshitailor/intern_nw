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

Anyone cloning this repository can get the project up and running locally without extra global tools, except Node.js and MySQL/XAMPP.

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* [Git](https://git-scm.com/)
* [MySQL Server / XAMPP](https://www.apachefriends.org/) (or a cloud MySQL database connection string)

---

