import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TASKS_QUERY_KEY } from "../../constants/queryKeys";
import { deleteTask } from "../../api/tasks.api";
import type { ITask } from "../../types/api";
import { toast } from "sonner";

export const useDeleteTask = (projectId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => {
        queryClient.setQueryData([TASKS_QUERY_KEY, projectId], (oldData: ITask[]) => {
            const newData = oldData.filter(item => item.id !== data.id)

            return newData
        })
        toast.success('Task deleted successfully!')
    },
    onError: (error)=> toast.error(`Something went wrong: ${error}`)
  });
};