import { useMutation } from "@tanstack/react-query";
import { leaveProject } from "../../api/projects.api";
import { queryClient } from "../../providers/ReactQueryProvider";

export const useLeaveProject = () => {
    return useMutation({
        mutationFn: leaveProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: () => {
            
        }
    });
}