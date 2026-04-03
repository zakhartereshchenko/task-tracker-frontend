import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../api/projects.api";

interface IProps {
    filterQuery: string;
}
export const useGetProjects = ({ filterQuery }: IProps) => {
    return useQuery({
        queryKey: ["projects", filterQuery],
        queryFn: () => getProjects(filterQuery),
    });
};
