import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTask } from "../../api/tasks.api";
import { TASK_QUERY_KEY, TASKS_QUERY_KEY } from "../../constants/queryKeys";
import type { ITask } from "../../types/api";

export const useGetTask = ({projectId, taskId}:{projectId: string, taskId: string}) => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: [TASK_QUERY_KEY, projectId, taskId],
        queryFn: () => getTask({projectId, taskId}),
        placeholderData: () => {
            const allTasks = queryClient.getQueryData<ITask[]>([TASKS_QUERY_KEY, projectId])

            return allTasks?.find((task: ITask) => task.id === taskId)
        },
        enabled: !!taskId,
    });
}