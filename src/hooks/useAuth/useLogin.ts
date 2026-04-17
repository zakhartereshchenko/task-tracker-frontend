import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth.api";
import { queryClient } from "../../providers/ReactQueryProvider";

export const useLogin = () => {

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};