import { useMutation } from "@tanstack/react-query";
import { joinProject } from "../../api/projects.api";
import { queryClient } from "../../providers/ReactQueryProvider";
import { toast } from "sonner";

export const useJoinProject = () => {
    return useMutation({
        mutationFn: joinProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success('You joined the project')
        },
        onError: () => {
            toast.error('Something went wrong')
        }
    });
}