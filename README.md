# TaskFlow

A modern full-stack Kanban Task Management application built with the MERN stack. Manage tasks using an intuitive drag-and-drop interface with instant updates, priority levels, due dates, and persistent storage.

## Live Demo

Frontend: [https://todo-ten-livid-96.vercel.app/](Live)

Backend API: [https://todo-backend-rf1v.onrender.com](Live)

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

## Design Decisions

- **React Query for server state** – Used TanStack Query to manage server state, caching, and mutations while keeping UI state separate from API state.
- **DnD Kit for drag-and-drop** – Chosen for its flexibility, accessibility, and support for both reordering within a column and moving tasks across columns.
- **Persistent task ordering** – Each task stores an `order` field in MongoDB, ensuring drag-and-drop order is preserved across refreshes and sessions.
- **Optimistic UI updates** – The UI updates immediately after a drag operation while the backend persists the changes in the background for a smoother user experience.
- **Modular project structure** – Components, hooks, services, and backend logic are organized by responsibility to keep the codebase maintainable and scalable.
- **Separate frontend and backend** – The project is split into independent frontend and backend applications within a single repository, making deployment and future expansion easier.

---

## Known Limitations

- The application currently supports a **single shared board** and does not include user authentication or user-specific workspaces.
- Concurrent edits by multiple users are not synchronized in real time; the application follows a **last-write-wins** approach.
- Due dates are displayed for reference only and do not automatically sort or prioritize tasks.
- Bonus features such as **search/filtering, labels, activity history, and real-time collaboration** were intentionally left out to prioritize delivering the core assignment requirements within the given timeframe.
- Error handling is limited to the current assignment scope and could be further enhanced with retry mechanisms and user-facing notifications.

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
