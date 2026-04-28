import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTask } from "../../api/tasks.api";
import { TASKS_QUERY_KEY } from "../../constants/queryKeys";
import type { ITask } from "../../types/api";
import { toast } from "sonner";
import type { TaskStatus } from "../../types/projects";

export const useChangeTaskStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editTask,
        onMutate: async (variables) => {
            const queryKey = [TASKS_QUERY_KEY, variables.projectId];

            await queryClient.cancelQueries({ queryKey });

            const previousTasks = queryClient.getQueryData<ITask[]>(queryKey);

            queryClient.setQueriesData<ITask[]>({ queryKey }, (oldData = []) => {
                return oldData.map(task =>
                    task.id === variables.taskId
                        ? { ...task, status: variables.body.status as TaskStatus }
                        : task
                );
            });

            return { previousTasks, queryKey };
        },
        onSuccess: (data) => {
            const queryKey = [TASKS_QUERY_KEY, data.projectId];

            queryClient.setQueryData<ITask[]>(queryKey, (old = []) => {
                return old.map(task =>
                    task.id === data.id ? data : task
                );
            });

            toast.success("Task updated successfully");
        },
        onError: (error, variables, context) => {
            if (context?.previousTasks && context?.queryKey) {
                queryClient.setQueryData(context.queryKey, context.previousTasks);
            }

            toast.error(`Something went wrong: ${error}`);
        },
    });
};