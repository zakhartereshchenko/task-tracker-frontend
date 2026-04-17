import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../api/tasks.api";
import { TASKS_QUERY_KEY } from "../../constants/queryKeys";

interface IProps {
    projectId?: string;
    statusQuery?: string;
    labelsQuery?: string;
    priorityQuery?: string;
}

export const useGetTasks = ({projectId, statusQuery, labelsQuery, priorityQuery}:IProps) => {
    return useQuery({
        queryKey: [TASKS_QUERY_KEY, projectId, statusQuery, labelsQuery],
        queryFn: () => getTasks({projectId: projectId!, labelsQuery, statusQuery, priorityQuery}),
        enabled: !!projectId,
    });
}