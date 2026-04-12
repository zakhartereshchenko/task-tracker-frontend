import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../api/tasks.api";
import type { ITask } from "../../types/api";
import { TASKS_QUERY_KEY } from "../../constants/queryKeys";


export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["tasks"],
      // });
      queryClient.setQueryData([TASKS_QUERY_KEY, data.projectId], (oldData: ITask[]) => {
        if (!oldData) {
          return [data]
        }

        return [...oldData, data]})
    },
  });
};