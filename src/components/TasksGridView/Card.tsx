import { type FC } from "react"
import type { ITask } from "../../types/api"
import {useDraggable} from '@dnd-kit/react'
import { Badge } from "../ui/badge"
import { getFormattedPriorityTextAndColor } from "../../utils/ui"
import { useNavigate, useParams } from "react-router-dom"

interface IProps{
    task: ITask
    isDragOverlay?: boolean
}

export const Card: FC<IProps> = ({task, isDragOverlay=false}) => {
    const navigate = useNavigate()
    const { projectId } = useParams();
    
    const {ref, isDragging, isDropping} = useDraggable({
        id: task.id,
    });

    const labels = (
        <ul className="flex flex-row gap-1">
            {task.labels.map(label => 
                <li key={label.id}>
                    <Badge
                        key={label.id}
                        style={{ backgroundColor: label.color || undefined }}
                        className="text-white"
                    >
                    {label.name}
                    </Badge>
                </li>
            )}
        </ul>
    )

    const {color:priorityBadgeColor, text:priorityText} = getFormattedPriorityTextAndColor(task.priority)

    const handleOpenEditTask = () => navigate(`/projects/${projectId}/${task.id}`)

    return (
        <div ref={ref} onDoubleClick={handleOpenEditTask} className={`flex flex-col  gap-2 p-3 rounded border border-zinc-800 mb-2 cursor-pointer ${isDragging && !isDragOverlay && 'opacity-30'} ${isDropping && 'opacity-0'}`}>
            <p className="text-xl">{task.title}</p>
            {labels}
            <p>Priority: <Badge className={`${priorityBadgeColor}`}>{priorityText}</Badge></p>
            <p className="flex gap-2 items-center">Assignee: {task.assignee ? task.assignee.username : 'none'}</p>
        </div>
    )
}