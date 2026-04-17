import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/users.api";

export const useGetUsers = (projectId: string) => {
    return useQuery({
        queryKey: ["users", projectId],
        queryFn: () => getUsers(projectId),
        enabled: !!projectId,
    });
};