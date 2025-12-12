# TaskReact

# ODO / Task Management System

## Project Overview

This project is a **Task Management System** built with **Laravel 11** for the backend and **React** for the frontend.  
It includes user authentication, task CRUD operations, task filtering and pagination, status updates, and statistical information. Users can only view and manage their own tasks.

## Features

- User authentication with **Token-based auth (Sanctum)**
- **Login page** (no registration implemented)
- View and manage only own tasks
- **CRUD operations** for tasks
- **Filter tasks by status** (Pending / In Progress / Done / All)
- **Pagination** for task lists
- **Update task status** (pending / in_progress / done)
- **Show statistics** (total, pending, in_progress, done)
- Protected routes for authenticated users
- Error handling for both API and frontend
- Clean, well-structured backend and frontend code
- API documentation available via **Postman Collection**

## Architecture

### Frontend (React)

- **Pages:** Login, Task List, Create/Edit Task
- **Components:** Modular, reusable components
- **State Management:** `useState`, `useEffect`, `useContext`
- **Routing:** React Router for protected and public routes
- **API Calls:** Axios with token headers stored in Cookies / LocalStorage
- **UI:** React-Bootstrap for tables, buttons, and layout
- **Features:** Pagination, filtering, status updates, task statistics

## Setup Instructions

### Frontend

1. npm install
2. npm run start
