import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { queryClient } from "../providers/ReactQueryProvider";

export const useRegister = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/projects");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => {
      navigate("/login");
    }
  });
}