import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";
import { checkAuth } from "../api/auth.api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();
    const setUser = useAuthStore((s) => s.setUser);
    const logout = useAuthStore((s) => s.logout);

    const query = useQuery({
        queryKey: ["me"],
        queryFn: checkAuth,
        retry: false,
    });

    useEffect(()=>{
        if (query.isSuccess && query.data) {
            setUser(query.data);
            navigate("/projects");
        }
        if (query.isError) {
            logout();
            navigate("/login");
        }
    },[query.isSuccess, query.isError, query.data, setUser, logout, navigate])

    return query;
}