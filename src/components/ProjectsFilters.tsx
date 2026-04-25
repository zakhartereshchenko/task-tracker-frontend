import type { FC } from "react";
import { useSearchFilter } from "../hooks/useSearchFilter";
import { CreateProjectForm } from "./forms";

interface IProps {
    placeholder?: string;
}

export const ProjectsFilters: FC<IProps> = ({ placeholder }) => {
    const { Input } = useSearchFilter(placeholder)

    return (
        <div className="flex items-center justify-between">
            {Input}
            <CreateProjectForm />
        </div>
    )
}