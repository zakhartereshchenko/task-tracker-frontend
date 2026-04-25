import type { FC } from "react"
import type { ITask } from "../../types/api"
import { useDroppable } from "@dnd-kit/react"
import type { TaskStatus } from "../../types/projects"
import { Card } from "./Card"
import { cn } from "../../lib/utils"

interface IProps{
    id: TaskStatus
    title: string
    tasks: ITask[]
}

export const Column:FC<IProps> = ({id, title, tasks}) => {
    
    const {ref, isDropTarget} = useDroppable({
        id
    });
    
    return(
        <div ref={ref} className={cn(
            "w-full flex flex-col p-2 gap-3 border border-transparent transition-colors duration-150",
            isDropTarget ? 'border-green-700 rounded' : 'border-transparent'
        )}>
            <h3>{title}</h3>
            <ul>
                {tasks?.map(task => (
                    <li key={task.id}>
                        <Card task={task} />
                    </li>
                ))}
            </ul>
        </div>
    )
}