import type { LOGIN_MODE } from "../constants/forms";
import type { ITask } from "./api";
import type { IProjectListItem } from "./projects";

export interface LoginData {
    username: string
    password: string
}

export type TLoginMode = typeof LOGIN_MODE[keyof typeof LOGIN_MODE];

export type IProjectForm = Omit<IProjectListItem, "id">;

export type ITaskForm = Pick<ITask, "title" | "description" | "status" | "priority" | "labels" | "assigneeId">
