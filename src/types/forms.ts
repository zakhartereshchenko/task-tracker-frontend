import type { LOGIN_MODE } from "../constants/forms";
import type { IProjectListItem } from "./projects";

export interface LoginData {
    username: string
    password: string
}

export type TLoginMode = typeof LOGIN_MODE[keyof typeof LOGIN_MODE];

export type IProjectForm = Omit<IProjectListItem, "id">;