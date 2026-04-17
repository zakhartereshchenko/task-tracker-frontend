import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLabel } from "../../api/labels.api";
import { toast } from "sonner";

export const useCreateLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLabel,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["labels"],
      });
      toast.success("New label created successfully")
    },
    onError: (error) => toast.error(`Failed to create label: ${error}`)
  });
};