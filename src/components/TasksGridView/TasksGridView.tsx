import { useMemo, useState, type FC } from "react";
import type { ITask } from "../../types/api";
import { TaskStatus, TaskStatusArray, TaskStatusLabels } from "../../types/projects";
import { useParams } from "react-router-dom";
import { Column } from "./Column";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { Card } from "./Card";
import { Separator } from "../ui/separator";
import { useChangeTaskStatus } from "../../hooks/useTasks/useChangeTaskStatus";

interface IProps{
    tasks: ITask[];
}

export const TasksGridView: FC<IProps> = ({tasks}) => {
    const { projectId = '' } = useParams();
    
    const { mutateAsync: dragTask } = useChangeTaskStatus()
    
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
    
    const grouped = useMemo(() => {
        return tasks.reduce((acc, task) => {
        if (!acc[task.status]) acc[task.status] = [];
        acc[task.status].push(task);
        return acc;
        }, {} as Record<string, ITask[]>);
    }, [tasks]);

    const activeTask = useMemo(() => { 
        return tasks.find(t => t.id === activeTaskId) ?? null 
    },[tasks, activeTaskId]);

    return (
        <div>
            <DragDropProvider
                onDragStart={(event) => {
                    const sourceId = String(event.operation.source?.id);
                    setActiveTaskId(sourceId);
                }}
                onDragEnd={(event) => {
                    setActiveTaskId(null);

                    if (event.canceled) return;

                    const {target, source} = event.operation;

                    if(!target) return;

                    const taskId = String(source?.id);
                    const newStatus = target.id as TaskStatus

                    const currentTask = tasks.find(task => task.id === taskId)
                    const currentStatus = currentTask?.status

                    if(currentStatus === newStatus) return 

                    dragTask({
                        projectId, 
                        taskId, 
                        body: { status: newStatus}
                    })
                }}
            >
                <div className="flex flex-row gap-1">
                    {TaskStatusArray.map((status, index) => (
                        <div key={status} className="flex w-full gap-1">
                            {index !== 0 && <Separator orientation="vertical" className="h-auto"/>}
                            <Column id={status} title={TaskStatusLabels[status]} tasks={grouped[status]} />
                        </div>
                    ))}
                </div>
                <DragOverlay>
                    {activeTask ? <Card task={activeTask} isDragOverlay /> : null}
                </DragOverlay>
            </DragDropProvider>
        </div>
    )
}