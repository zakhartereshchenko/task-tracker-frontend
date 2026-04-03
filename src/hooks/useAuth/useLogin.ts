import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { login } from "../../api/auth.api";
import { queryClient } from "../../providers/ReactQueryProvider";
import type { ILoginResponse } from "../../types/api";

export const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: login,
    onSuccess: (data: ILoginResponse) => {
      setUser(data.user);
      navigate("/projects");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => {
      navigate("/login");
    }
  });
};