import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../../api/projects.api";
import { toast } from "sonner";


export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      toast.success("Project created successfully");
    },
    onError: (error) => toast.error(`Failed to create project: ${error}`)
  });
};