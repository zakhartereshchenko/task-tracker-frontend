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
      // queryClient.invalidateQueries({
      //   queryKey: [TASKS_QUERY_KEY, data.projectId],
      // });
      queryClient.setQueriesData({ queryKey: [TASKS_QUERY_KEY, data.projectId] }, (oldData: ITask[] | undefined) => {

        return oldData ? oldData.filter((task) => task.id !== data.id) : [];
      })

      toast.success('Task deleted successfully!')
    },
    onError: (error) => toast.error(`Something went wrong: ${error}`)
  });
};