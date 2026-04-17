import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProject } from "../../api/projects.api";
import { PROJECTS_QUERY_KEY } from "../../constants/queryKeys";
import type { IProjectListItem } from "../../types/projects";

export const useGetProject = (projectId?: string) => {
    const queryclient = useQueryClient()

    return useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProject(projectId!),
        placeholderData: () => {
            const allProjects = queryclient.getQueryData<IProjectListItem[]>([PROJECTS_QUERY_KEY])

            return allProjects?.find(project => project.id === projectId)
        },
        enabled: !!projectId,
    });
}