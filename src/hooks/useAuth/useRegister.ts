import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../providers/ReactQueryProvider";
import type { ILoginResponse } from "../../types/api";
import { toast } from "sonner";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: (data: ILoginResponse) => {
      navigate("/projects");
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Signed up successfully" )
    },
    onError: (error) => {
      navigate("/login");
      toast.error(`${error}` )
    }
  });
}