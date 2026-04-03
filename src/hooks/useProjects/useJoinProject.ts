import { useMutation } from "@tanstack/react-query";
import { joinProject } from "../../api/projects.api";
import { queryClient } from "../../providers/ReactQueryProvider";

export const useJoinProject = () => {
    return useMutation({
        mutationFn: joinProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: () => {
            
        }
    });
}