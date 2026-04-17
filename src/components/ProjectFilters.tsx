import { type FC } from "react";
import { useSearchFilter } from "../hooks/useSearchFilter"
import { CreateTaskForm } from "./forms";
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "./ui/multi-select";
import { useGetLabels } from "../hooks/useLabels/useGetLabels";
import { useParams, useSearchParams } from "react-router-dom";
import { TaskPriorityArray, TaskStatusArray, TaskStatusLabels } from "../types/projects";

interface IProps {
    
}

export const ProjectFilters: FC<IProps> = () => {
    const { projectId } = useParams();
    const {Input} = useSearchFilter()

    const { data: labelsList, isPending: isPendingLabel } = useGetLabels(projectId ?? "");

    const [searchParams, setSearchParams] = useSearchParams();

    const labels = searchParams.get("labels")?.split(",") ?? [];
    const status = searchParams.get("status")?.split(",") ?? [];
    const priority = searchParams.get("priority")?.split(",") ?? [];

    const handleFilterChange = (key: "labels" | "status" | "priority") =>
    (values: string[]) => {
        const params = new URLSearchParams(searchParams);

        if (values.length) {
            params.set(key, values.join(","));
        } else {
            params.delete(key);
        }

        setSearchParams(params);
    };

    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
                {Input}
                <MultiSelect
                    values={labels}
                    onValuesChange={handleFilterChange("labels")}
                >
                    <MultiSelectTrigger className="w-50 max-h-8">
                        <MultiSelectValue placeholder="Select labels..." />
                    </MultiSelectTrigger>
                    <MultiSelectContent>
                        <MultiSelectGroup>
                            {labelsList && labelsList.map(label => (
                                <MultiSelectItem key={label.id} value={label.id}>
                                    {label.name}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectGroup>
                    </MultiSelectContent>
                </MultiSelect>
                <MultiSelect
                    values={status}
                    onValuesChange={handleFilterChange("status")}
                >
                    <MultiSelectTrigger className="w-50 max-h-8">
                        <MultiSelectValue placeholder="Select status..." />
                    </MultiSelectTrigger>
                    <MultiSelectContent>
                        <MultiSelectGroup>
                            {TaskStatusArray.map(label => (
                                <MultiSelectItem key={label} value={label}>
                                    {TaskStatusLabels[label]}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectGroup>
                    </MultiSelectContent>
                </MultiSelect>
                <MultiSelect
                    values={priority}
                    onValuesChange={handleFilterChange("priority")}
                >
                    <MultiSelectTrigger className="w-50 max-h-8">
                        <MultiSelectValue placeholder="Select priority..." />
                    </MultiSelectTrigger>
                    <MultiSelectContent>
                        <MultiSelectGroup>
                            {TaskPriorityArray.map(label => (
                                <MultiSelectItem key={label} value={label}>
                                    {label}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectGroup>
                    </MultiSelectContent>
                </MultiSelect>
            </div>
            <CreateTaskForm />
        </div>
    )
}