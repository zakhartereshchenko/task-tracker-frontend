import { Loader, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useDeleteTask } from "../../hooks/useTasks/useDeleteTask";
import type { ITask } from "../../types/api";
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmationModal } from "../ConfirmationModal";
import { useState } from "react";

interface IProps{
    task: ITask,
}
export const ActionsColumn: React.FC<IProps> = ({task}) => {
    const { projectId } = useParams();
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);

    const { mutateAsync: deleteTask, isPending: isPendingTask } = useDeleteTask(projectId);

    const handleCopyId = () => {
        navigator.clipboard.writeText(task.id)
    }

    const handleEdit = () => {
        navigate(`/projects/${projectId}/${task.id}`)
    }

    const handleDelete = () => {
        deleteTask({projectId: projectId!, taskId:task.id})
        setOpen(false)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                {isPendingTask ? <Loader /> : <MoreHorizontal className="h-4 w-4" />}
            </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem onClick={handleCopyId}>
                Copy ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleEdit}>
                Edit task
            </DropdownMenuItem>

            <DropdownMenuItem
                // onClick={handleDelete}
                onSelect={(e) => {
                    setOpen(true)
                }}
                className="text-destructive"
            >
                Delete task
            </DropdownMenuItem>
            </DropdownMenuContent>
            <ConfirmationModal 
                open={open}
                onOpenChange={setOpen}
                title='Are you absolutely sure?' 
                subtitle="This action cannot be undone. This will permanently delete your 1 task from our servers."
                submitButton={<Button variant="destructive" onClick={handleDelete}>Delete</Button>}
            />
        </DropdownMenu>
    )
}