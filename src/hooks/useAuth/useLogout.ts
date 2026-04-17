import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/auth.api";
import { queryClient } from "../../providers/ReactQueryProvider";

export const useLogout = () => {

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["me"] });
    }
  });
};