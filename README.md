# 🏞️ Tourism-Jharkhand

## 🌐 Overview

This repository contains an interactive platform for exploring tourist and cultural sites in Jharkhand, India. The project offers features such as interactive maps and AR/VR previews to enhance tourism experiences.

---

## ✨ Features

- 🗺️ **Interactive Maps:** Navigate and discover places across Jharkhand.
- 🏛️ **Cultural & Tourist Sites:** Explore detailed information about various destinations.
- 🌁 **AR/VR Previews:** Experience sites virtually before visiting.
- 📸 **Image Management:** Upload and view site images.
- 🔎 **Search & Filter:** Find places by name, district, or proximity.
- 🗄️ **RESTful API:** Clean endpoints for all operations.

---

## ⚙️ Tech Stack

- **Node.js** + **Express.js** (Backend API)
- **MongoDB** + **GridFS** (Database & Image Storage)
- **Helmet, CORS, Rate Limiting** (Security)
- **Multer** (File upload)

---

## 🚀 Steps for Execution

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/pKm69/Tourism-Jharkhand.git
cd Tourism-Jharkhand/backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Setup

```bash
cp .env.example .env
# Edit .env with your MongoDB URI and other settings
```

### 4️⃣ Start MongoDB

- Make sure MongoDB is running locally or provide your Atlas URI in `.env`.

### 5️⃣ Seed Initial Data

```bash
npm run seed
```

### 6️⃣ Start the Server

- For development (with hot reload):

```bash
npm run dev
```

- For production:

```bash
npm start
```

---

## 🏗️ Project Structure

```

---

## 📖 Explanation of the Repo

**Tourism-Jharkhand** is designed to digitize and enrich tourism information for Jharkhand. It provides a robust backend for managing places, images, and advanced search features, supporting an interactive frontend (potentially with AR/VR capabilities).

You can:
- Upload & manage information about tourist spots,
- Store and serve images efficiently,
- Search, filter, and discover places using flexible APIs,
- Extend the system for future features such as events, AR/VR, and analytics.

**Perfect for:** Tourism departments, travel startups, developers building interactive travel guides, or anyone wanting to promote Jharkhand’s heritage using modern tech!

---