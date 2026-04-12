import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLabel } from "../../api/labels.api";

export const useCreateLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLabel,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["labels"],
      });
    },
  });
};