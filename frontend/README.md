# TaskFlow - Task Manager App

A full-stack Task Manager application built with React, Spring Boot, and MongoDB.

## 🚀 Live Demo
- **Frontend:** (Add Vercel link here)
- **Backend:** (Add Render link here)

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Axios, React Router |
| Backend | Java 17, Spring Boot 3.2, Spring Security |
| Auth | JWT (JSON Web Tokens) |
| Database | MongoDB Atlas |
| Deployment | Vercel (Frontend), Render (Backend) |

## ✨ Features

- **Authentication** — Register and login with JWT-based auth
- **Task Management** — Create, update, and delete tasks
- **Kanban Board** — 3-column board: Todo, In Progress, Done
- **Stats Bar** — Live count of tasks per stage
- **Responsive UI** — Works on mobile and desktop
- **Loading & Error States** — Spinner on load, error messages on failure

## 📁 Project Structure

```
taskmanager-app/
├── taskmanager-backend/        # Spring Boot backend
│   └── src/main/java/com/taskmanager/
│       ├── controller/         # REST controllers
│       ├── model/              # MongoDB documents
│       ├── repository/         # MongoDB repositories
│       ├── service/            # Business logic
│       ├── security/           # JWT filter, config
│       └── dto/                # Request/Response DTOs
└── frontend/                   # React frontend
    └── src/
        ├── pages/              # Login, Register, Dashboard
        ├── components/         # TaskCard, TaskModal
        └── api/                # Axios instance
```

## 🔧 Running Locally

### Backend
```bash
cd taskmanager-backend
mvn spring-boot:run
```
Runs on `http://localhost:8081`

### Frontend
```bash
cd frontend
npm install
npm start
```
Runs on `http://localhost:3000`

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login, returns JWT |
| GET | /api/tasks | Get all tasks for user |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

## 📝 Assumptions & Tradeoffs

- **MongoDB over MySQL** — Used MongoDB Atlas (cloud) to avoid local setup complexity.
- **No task ordering** — Tasks are ordered by creation time, not manually sortable.
- **Username as identity** — Used username instead of email for simplicity.
- **Single user scope** — Each user only sees their own tasks, enforced on the backend.
- **JWT in localStorage** — Stored for simplicity. In production, HttpOnly cookies would be more secure.

## 🤖 AI Tools Used
This project was built with AI assistance (Amazon Q), which is why the backend is mandatory per the assignment requirements.
