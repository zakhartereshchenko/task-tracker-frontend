import { useQuery } from "@tanstack/react-query";
import { getLabels } from "../../api/labels.api";

export const useGetLabels = (projectId: string) => {
    return useQuery({
        queryKey: ["labels", projectId],
        queryFn: () => getLabels(projectId),
        enabled: !!projectId,
    });
};