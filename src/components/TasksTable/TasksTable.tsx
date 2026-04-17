
import { useNavigate, useParams } from "react-router-dom";
import type { ITask } from "../../types/api";
import { DataTable } from "../ui/data-table"
import { columns } from "./columns"

interface IProps {
    tasks: ITask[];
}

export const TasksTable: React.FC<IProps> = ({ tasks }) => {
    const navigate = useNavigate()
    const { projectId } = useParams();
    
    return(
        <DataTable columns={columns} data={tasks} onRowDoubleClick={(task)=>navigate(`/projects/${projectId}/${task.id}`)} />
    )
}