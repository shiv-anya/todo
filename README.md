# TaskFlow

A modern full-stack Kanban Task Management application built with the MERN stack. Manage tasks using an intuitive drag-and-drop interface with instant updates, priority levels, due dates, and persistent storage.
---

## Features

- Create, edit and delete tasks
- Drag & Drop using DnD Kit
- Reorder tasks within the same column
- Move tasks across columns
- Persistent ordering stored in MongoDB
- Priority levels (Low, Medium, High)
- Due date support
- Responsive glassmorphism UI
- Optimistic UI updates
- React Query caching
- Independent loading states for each column

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- TanStack Query
- DnD Kit
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Folder Structure

```
todo/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/shiv-anya/todo
cd todo
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs on

```
http://localhost:5000
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on

```
http://localhost:5173
```

---

## Environment Variables

### Backend

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

### Frontend

Create a `.env` file inside the frontend folder.

```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Endpoints

| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| GET    | `/api/tasks`         | Fetch all tasks |
| POST   | `/api/tasks`         | Create task     |
| PUT    | `/api/tasks/:id`     | Update task     |
| DELETE | `/api/tasks/:id`     | Delete task     |
| PATCH  | `/api/tasks/reorder` | Reorder tasks   |

---

## Key Highlights

- Built with a modular architecture using reusable React components.
- Drag-and-drop interactions powered by DnD Kit.
- React Query manages server state with caching and mutations.
- MongoDB persists task order and status across sessions.
- Responsive design optimized for desktop and mobile devices.

## License

This project is for learning and portfolio purposes.
