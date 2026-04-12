import type { IProjectListItem, TaskStatus, TaskPriority, User } from "./projects";

export interface IAuthData {
    username: string;
    password: string;
}

export interface ILoginResponse {
    user: {
        id: string;
        username: string;
    };
}

export type ProjectResponse = Pick<IProjectListItem, "id" | "name" | "description" | "createdAt">

export interface LabelResponse {
    id: string;
    name: string;
    color: string | null;
    projectId: string;
    createdAt: string;
}

export interface ITask {
    labels: {
        id: string,
        projectId: string,
        createdAt: string,
        name: string,
        color?: string,
    }[],
    assignee: User,
    createdBy: User,
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    projectId: string;
    creatorId: string;
    assigneeId?: string;
    createdAt: string;
    updatedAt: string;
}