import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../../api/auth.api";

export const useAuth = () => {

    const query = useQuery({
        queryKey: ["me"],
        queryFn: () => checkAuth(),
        retry: false,
    });

    return query;
}