import { useParams } from "react-router-dom"
import { useGetTask } from "../../../hooks/useTasks/useGetTask"
import { EditTaskFormSkeleton } from "./Skeleton"
import { EditTaskForm } from "./EditTaskForm"

export const EditTaskFormContainer = () => {
    const { projectId = '', taskId = '' } = useParams();

    const { data: task, isPending: isPendingTask } = useGetTask({ projectId, taskId })

    if (isPendingTask || !task) {
        return <EditTaskFormSkeleton />
    }

    return (
        <EditTaskForm task={task} />
    )
}