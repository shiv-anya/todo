import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, updateTask, deleteTask } from "../services/taskService.js";

/**
 * Bundles the create/update/delete mutations and keeps each column's
 * TanStack Query cache (['tasks', status]) in sync on success, so a
 * background refetch never overwrites what the user just did.
 */
export function useTaskMutations() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createTask,
    onSuccess: (newTask) => {
      queryClient.setQueryData(["tasks", newTask.status], (old = []) => [
        ...old,
        newTask,
      ]);
    },
  });

  const update = useMutation({
    mutationFn: ({ id, updates }) => updateTask(id, updates),

    onSuccess: (updatedTask, variables) => {
      const statuses = new Set(
        [updatedTask.status, variables.previousStatus].filter(Boolean)
      );

      statuses.forEach((status) => {
        queryClient.setQueryData(["tasks", status], (old = []) => {
          const withoutTask = old.filter(
            (task) => task._id !== updatedTask._id
          );

          return updatedTask.status === status
            ? [...withoutTask, updatedTask]
            : withoutTask;
        });
      });
    },
  });

  const remove = useMutation({
    mutationFn: ({ id }) => deleteTask(id),
    onSuccess: (result, variables) => {
      queryClient.setQueryData(["tasks", variables.status], (old = []) =>
        old.filter((task) => task._id !== result.id)
      );
    },
  });

  return { create, update, remove };
}
