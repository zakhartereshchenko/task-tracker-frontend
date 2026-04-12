import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../api/tasks.api";
import { TASKS_QUERY_KEY } from "../../constants/queryKeys";

export const useGetTasks = ({projectId}:{projectId?: string}) => {
    return useQuery({
        queryKey: [TASKS_QUERY_KEY, projectId],
        queryFn: () => getTasks(projectId!),
        enabled: !!projectId,
    });
}