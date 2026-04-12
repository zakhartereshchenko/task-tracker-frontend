import { endpoints } from "../constants/api";
import type { ITaskForm } from "../constants/forms";
import type { ITask } from "../types/api";
import { api } from "../utils/api";

export interface ICreateTask {
    body: ITaskForm,
    projectId: string
}

export const createTask = (data: ICreateTask) => api.post<ITask>(endpoints.createTask(data.projectId), data.body);

export const getTasks = (projectId: string) => api.get<ITask[]>(endpoints.createTask(projectId));

export const deleteTask = ({projectId, taskId}:{projectId: string, taskId: string}) => api.delete<ITask>(endpoints.deleteTask({projectId, taskId}));
