
import type { ITask } from "../../types/api";
import { DataTable } from "../ui/data-table"
import { columns } from "./columns"

interface IProps {
    tasks: ITask[];
}

export const TasksTable: React.FC<IProps> = ({ tasks }) => {
    return(
        <DataTable columns={columns} data={tasks} />
    )
}