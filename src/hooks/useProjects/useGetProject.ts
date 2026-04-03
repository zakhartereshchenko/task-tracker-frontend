import { useQuery } from "@tanstack/react-query";
import { getProject } from "../../api/projects.api";

export const useGetProject = (id?: string) => {
    return useQuery({
        queryKey: ["project", id],
        queryFn: () => getProject(id!),
        enabled: !!id,
    });
}