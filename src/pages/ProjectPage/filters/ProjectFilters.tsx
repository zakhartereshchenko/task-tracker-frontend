import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "../../../components/ui/multi-select";
import { useParams, useSearchParams } from "react-router-dom";
import { useSearchFilter } from "../../../hooks/useSearchFilter";
import { useGetLabels } from "../../../hooks/useLabels/useGetLabels";
import { TaskPriorityArray, TaskPriorityLabels, TaskStatusArray, TaskStatusLabels } from "../../../types/projects";
import { CreateTaskForm } from "../../../components/forms";
import { useEffect, type FC } from "react";
import type { TViewMode } from "../../../types/ui";

interface IProps {
    viewMode: TViewMode
}

export const ProjectFilters:FC<IProps> = ({ viewMode }) => {
    const { projectId } = useParams();
    const {Input} = useSearchFilter()

    const { data: labelsList } = useGetLabels(projectId ?? "");

    const [searchParams, setSearchParams] = useSearchParams();

    const labels = searchParams.get("labels")?.split(",") ?? [];
    const status = searchParams.get("status")?.split(",") ?? [];
    const priority = searchParams.get("priority")?.split(",") ?? [];

    const showStatusFilter = viewMode === 'table'

    useEffect(() => {
        if (showStatusFilter) return;

        if (!searchParams.has("status")) return;

        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.delete("status");
            return params;
        });
    }, [showStatusFilter, searchParams, setSearchParams]);

    const handleFilterChange = (key: "labels" | "status" | "priority") =>
    (values: string[]) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);

            if (values.length) {
                params.set(key, values.join(","));
            } else {
                params.delete(key);
            }

            return params;
        }); 
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
                {showStatusFilter && 
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
                }
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
                                    {TaskPriorityLabels[label]}
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