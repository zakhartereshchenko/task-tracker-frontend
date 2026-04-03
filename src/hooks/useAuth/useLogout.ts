import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/auth.api";
import { queryClient } from "../../providers/ReactQueryProvider";

export const useLogout = () => {
  const navigate = useNavigate();
  const logoutStore = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
        logoutStore();
        navigate("/login");
        queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => {
        // navigate("/login");
    }
  });
};