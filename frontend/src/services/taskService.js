import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL + "/api" || "http://localhost:5000/api",
});

export async function getTasks(status) {
  const { data } = await api.get("/tasks", {
    params: { status },
  });
  return data[status];
}

export async function createTask(payload) {
  const { data } = await api.post("/tasks", payload);

  return data;
}

export async function updateTask(id, updates) {
  const { data } = await api.put(`/tasks/${id}`, updates);

  return data;
}

export async function deleteTask(id) {
  await api.delete(`/tasks/${id}`);

  return { id };
}

export async function reorderTask(payload) {
  const { data } = await api.patch("/tasks/reorder", payload);
  return data;
}
