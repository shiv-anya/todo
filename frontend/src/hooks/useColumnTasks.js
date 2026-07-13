import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../services/taskService";

export function useColumnTasks(status) {
  return useQuery({
    queryKey: ["tasks", status],
    queryFn: () => getTasks(status),
  });
}
