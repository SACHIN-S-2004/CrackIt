<div align="center">

# 🧠 CrackIt

### Aptitude Test Platform built with the MERN Stack

<p align="center">

![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)
![Express](https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge&logo=express)
![React](https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-brightgreen?style=for-the-badge&logo=node.js)
![JWT](https://img.shields.io/badge/JWT-Auth-orange?style=for-the-badge&logo=jsonwebtokens)
![Bootstrap](https://img.shields.io/badge/UI-Bootstrap-purple?style=for-the-badge&logo=bootstrap)

</p>
</div>

---

## ✨ Overview

**CrackIt** is a full-stack aptitude test web application that lets users practice topic-wise tests, track their performance over time, and improve their scores. 
- 🌐 Live at **[CrackIt](https://crackit-ghy3.onrender.com/)** — hosted on **[Render](https://render.com)**.

Users can register, log in, select a test category and difficulty, attempt timed MCQ tests, and view their performance history — all in one seamless platform.

---


## 🎯 User Flow

```
Register / Login
      ↓
Browse Test Categories & Topics
      ↓
Select Difficulty (Easy / Medium / Hard)
      ↓
Attempt MCQ Test
      ↓
View Score & Explanations
      ↓
Track Performance History
```

---

## 🔥 Features

### 📝 Test Engine
- Topic-wise aptitude tests (categorized and difficulty-based)
- MCQ format with 4 options per question
- Per-question explanations after submission
- Guest mode with a sample test (no login required)

### 👤 User System
- Register & login with JWT authentication
- Edit profile (name, phone)
- Secure password hashing with bcrypt
- Protected routes via auth middleware

### 📊 Performance Tracker
- View test history by topic
- Score breakdown per attempt
- Visual charts powered by Recharts

### 💎 UI/UX
- Dark mode support
- Smooth animations via Framer Motion
- Mobile responsive Bootstrap layout
- Toast notifications for user feedback
- Glassmorphism-inspired design

### ⚡ Backend
- RESTful API with Express.js
- MongoDB + Mongoose for data persistence
- Bulk question upload support
- Modular MVC architecture

---

## 🏗️ Tech Stack

| Layer          | Tech                                     |
| -------------- | ---------------------------------------- |
| Frontend       | React 19, Vite, React Router v7          |
| UI             | Bootstrap 5, Framer Motion, Lucide React |
| Charts         | Recharts                                 |
| State          | Zustand                                  |
| HTTP Client    | Axios                                    |
| Backend        | Node.js, Express.js                      |
| Database       | MongoDB, Mongoose                        |
| Auth           | JWT, bcryptjs                            |
| Dev Tools      | Nodemon, ESLint                          |

---

## 📂 Project Structure

```
CrackIt/
│
├── backend/
│   ├── index.js
│   ├── .env
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── questionController.js
│   │   └── testResultController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Questions.js
│   │   ├── QuestionPack.js
│   │   ├── TestResult.js
│   │   └── UserMsg.js
│   └── routes/
│       ├── userRoutes.js
│       ├── aptTestRoutes.js
│       └── testResultRoutes.js
│
└── frontend/
    ├── index.html
    └── src/
        ├── App.jsx
        ├── pages/
        │   ├── HomePage.jsx
        │   ├── TestCategories.jsx
        │   ├── TestDifficulty.jsx
        │   ├── TestPage.jsx
        │   └── PerformanceTracker.jsx
        ├── components/
        │   ├── common/
        │   ├── home/
        │   └── modals/
        ├── store/
        └── utils/
```

---

## 🌐 API Endpoints

### User — `/user`
| Method | Endpoint    | Description          |
| ------ | ----------- | -------------------- |
| POST   | `/register` | Register a new user  |
| POST   | `/login`    | Login & get JWT      |
| PUT    | `/update`   | Update user profile  |

### Questions — `/question`
| Method | Endpoint    | Description              |
| ------ | ----------- | ------------------------ |
| GET    | `/get`      | Get questions by pack ID |
| GET    | `/getList`  | Get packs by topic       |
| POST   | `/add`      | Add a single question    |
| POST   | `/bulk-add` | Bulk upload questions    |

### Results — `/result`
| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| POST   | `/post`         | Save a test result      |
| GET    | `/:email`       | Get results by user     |

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/CrackIt.git
cd CrackIt
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### 4️⃣ Open browser

```
http://localhost:5173
```

---

## 🚀 Future Improvements

- Admin panel for question management
- Email verification on registration
- AI-based weak topic suggestions

---

## 🎓 Learning Outcomes

This project demonstrates:

- ✔ Full-stack MERN development
- ✔ JWT-based authentication & protected routes
- ✔ RESTful API design with MVC pattern
- ✔ State management with Zustand
- ✔ Data visualization with Recharts

---

## ⭐ If you like this project

Give it a star — it helps a lot!
