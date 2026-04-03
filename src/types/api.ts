import type { IProjectListItem } from "./projects";

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