import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTask } from "../../api/tasks.api";
import { TASKS_QUERY_KEY } from "../../constants/queryKeys";
import type { ITask } from "../../types/api";
import { toast } from "sonner";

export const useEditTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editTask,
        onSuccess: (data) => {
            queryClient.setQueryData([TASKS_QUERY_KEY, data.projectId], (oldData: ITask[]) => {
                if (!oldData) return [data]

                return oldData.map(task => task.id === data.id 
                    ? data 
                    : task
                )
            })
            toast.success("Task edited successfully");
        },
        onError: (error) => toast.error(`Something went wrong: ${error}`),
    });
};