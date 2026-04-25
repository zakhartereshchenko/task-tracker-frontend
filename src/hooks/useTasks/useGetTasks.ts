import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../api/tasks.api";
import { TASKS_QUERY_KEY } from "../../constants/queryKeys";

export interface IFilters {
    statusQuery?: string;
    labelsQuery?: string;
    priorityQuery?: string;
    titleQuery?: string;
}

interface IProps {
    projectId?: string;
    filters?: IFilters
}

export const useGetTasks = ({projectId, filters}: IProps) => {
    const {labelsQuery, statusQuery, priorityQuery, titleQuery} = filters ?? {};

    return useQuery({
        queryKey: [TASKS_QUERY_KEY, projectId, statusQuery, labelsQuery, priorityQuery, titleQuery],
        queryFn: () => getTasks({projectId: projectId!, labelsQuery, statusQuery, priorityQuery, titleQuery}),
        enabled: !!projectId,
    });
}