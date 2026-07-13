import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  reorderTask,
} from "../controllers/task.controller.js";
const r = Router();
r.get("/", getTasks);
r.post("/", createTask);
r.put("/:id", updateTask);
r.delete("/:id", deleteTask);
r.patch("/reorder", reorderTask);
export default r;
