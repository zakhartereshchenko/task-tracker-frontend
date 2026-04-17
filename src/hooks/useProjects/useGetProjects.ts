import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../api/projects.api";
import { PROJECTS_QUERY_KEY } from "../../constants/queryKeys";

interface IProps {
    filterQuery: string;
}
export const useGetProjects = ({ filterQuery }: IProps) => {
    return useQuery({
        queryKey: [PROJECTS_QUERY_KEY, filterQuery],
        queryFn: () => getProjects(filterQuery),
    });
};
