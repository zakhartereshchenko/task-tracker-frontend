import type { FC } from "react";
import { useSearchFilter } from "../hooks/useSearchFilter"
import { CreateTaskForm } from "./forms";

interface IProps {
    placeholder?: string;
}

export const ProjectFilters: FC<IProps> = ({ placeholder }) => {
    const {Input} = useSearchFilter(placeholder)

    return (
        <div className="flex flex-row justify-between">
            {Input}
            <CreateTaskForm />
        </div>
    )
}