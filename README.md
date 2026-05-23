# 💰 Expense Tracker — Full Stack Personal Finance Management App

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=flat&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?style=flat&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=flat)
![Vercel](https://img.shields.io/badge/Vercel-Frontend-black?style=flat&logo=vercel)
![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=flat)

> A modern full-stack finance tracking application that helps users manage income, expenses, analytics, and financial insights with beautiful UI and secure authentication.

---

# 📌 What Is This?

Expense Tracker is a professional full-stack web application built to help users efficiently manage their personal finances.

The application allows users to:

- Track income and expenses
- View financial analytics
- Monitor spending categories
- Edit/Delete transactions
- Securely authenticate accounts
- Login using Google OAuth
- Visualize spending patterns using charts

This project was built using modern frontend and backend technologies with cloud deployment support.

---

# ✨ Features

| Feature | Description |
|---|---|
| 🔐 User Authentication | Secure Login/Register system |
| 🌐 Google OAuth Login | Continue with Google support |
| 💰 Add Income | Add and manage income transactions |
| 💸 Add Expenses | Track expenses category-wise |
| ✏️ Edit Transactions | Modify income & expense entries |
| 🗑️ Delete Transactions | Remove transactions instantly |
| 📊 Analytics Dashboard | Financial insights & reports |
| 📈 Charts & Graphs | Expense visualization using charts |
| 📱 Responsive Design | Works across devices |
| ☁️ Cloud Deployment | Frontend on Vercel & Backend on Render |

---

# 🏗️ Architecture

```text
Frontend (React + Tailwind)
        │
        ▼
Axios API Requests
        │
        ▼
FastAPI Backend
        │
 ┌──────┴──────┐
 ▼             ▼
JWT Auth    PostgreSQL Database
        │
        ▼
Render Deployment
```

---

# 🛠️ Tech Stack

## Frontend

| Technology | Usage |
|---|---|
| React.js | Frontend Framework |
| Tailwind CSS | Styling |
| Axios | API Requests |
| Framer Motion | Animations |
| Recharts | Analytics Charts |
| Lucide React | Icons |

---

## Backend

| Technology | Usage |
|---|---|
| FastAPI | Backend API |
| SQLAlchemy | ORM |
| PostgreSQL | Database |
| JWT Authentication | Security |
| OAuth2 | Authentication |
| Uvicorn | Server |

---

## Deployment

| Platform | Usage |
|---|---|
| Vercel | Frontend Hosting |
| Render | Backend Hosting |

---

# 📁 Folder Structure

```text
expense-tracker/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── package.json
│
├── backend/
│   ├── app/
│   ├── routers/
│   ├── models.py
│   ├── database.py
│   ├── auth.py
│   ├── main.py
│   └── requirements.txt
│
└── README.md
```

---

# ⚙️ Installation

## Prerequisites

- Node.js
- Python 3.11+
- PostgreSQL
- Git

---

# 🚀 Backend Setup

```bash
cd backend

python -m venv venv
```

## Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Mac/Linux

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

# 🚀 Frontend Setup

```bash
cd frontend

npm install
```

---

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🔐 Environment Variables

## Backend `.env`

```env
DATABASE_URL=your_database_url

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

# 🌐 Deployment

## Frontend Deployment (Vercel)

Frontend deployed using:

```text
Vercel
```

---

## Backend Deployment (Render)

Backend deployed using:

```text
Render
```

---

# 💡 How to Use

1. Register a new account
2. Login securely
3. Add income transactions
4. Add expense transactions
5. View analytics dashboard
6. Track highest income & expenses
7. Edit/Delete transactions anytime

---

# 📊 Analytics Features

- Total Expenses
- Highest Income
- Highest Expense
- Category Breakdown
- Expense Charts
- Financial Insights
- Transaction Reports

---

# 🔐 Authentication Features

- JWT Authentication
- Protected Routes
- Google OAuth Login
- Secure Password Hashing
- Token-based Authorization


---

# 🚧 Known Limitations

- Single-user session only
- No export to PDF/Excel
- Monthly budget tracking not added yet
- Notifications not implemented

---

# 🔮 Future Improvements

- [ ] Budget Planner
- [ ] AI Financial Insights
- [ ] Export Reports
- [ ] Dark Mode
- [ ] Multi-user collaboration
- [ ] Mobile App Version
- [ ] Email Notifications

---

# 👨‍💻 Author

## Sathvik M S

- GitHub: https://github.com/sathvikms1720-droid
