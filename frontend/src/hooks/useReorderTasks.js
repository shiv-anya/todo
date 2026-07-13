import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderTask } from "../services/taskService.js";

export function useReorderTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => {
      return reorderTask(payload);
    },

    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.sourceStatus],
        refetchType: "none",
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.destinationStatus],
        refetchType: "none",
      });
    },

    onError: (err) => {
      console.error(err);
    },
  });
}
