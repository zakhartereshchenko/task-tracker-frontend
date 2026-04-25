import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth/useAuth";

export const AuthGuard = () => {
    const {data: user, isLoading, isError } = useAuth();

    if (isLoading) return null;

    if (isError || !user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};