import { endpoints } from "../constants/api";
import type { ITaskForm } from "../constants/forms";
import type { ITask } from "../types/api";
import { api, buildEndpoint } from "../utils/api";

export interface ICreateTask {
    body: ITaskForm,
    projectId: string
}

export interface IGetTasks {
    projectId: string, 
    labelsQuery?: string, 
    statusQuery?: string
    priorityQuery?: string;
    titleQuery?: string;
}

export const createTask = (data: ICreateTask) => api.post<ITask>(endpoints.createTask(data.projectId), data.body);

export const getTasks = ({projectId, labelsQuery, statusQuery, priorityQuery, titleQuery}: IGetTasks) => api.get<ITask[]>(buildEndpoint({url: endpoints.getTasks(projectId), queries: [{name: 'status', value: statusQuery}, {name:'labels', value: labelsQuery}, {name:'priority', value: priorityQuery}, {name:'title', value: titleQuery}]}));

export const getTask = ({projectId, taskId}:{projectId: string, taskId: string}) => api.get<ITask>(endpoints.getTask({projectId, taskId}));

export const deleteTask = ({projectId, taskId}:{projectId: string, taskId: string}) => api.delete<ITask>(endpoints.deleteTask({projectId, taskId}));

export const editTask = ({projectId, taskId, body}:{projectId: string, taskId: string, body:Partial<ITaskForm>}) => api.put<ITask>(endpoints.editTask({projectId, taskId}), body)