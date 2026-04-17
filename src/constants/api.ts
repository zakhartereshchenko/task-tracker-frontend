import type { IGetTasks } from "../api/tasks.api";

export const endpoints = {
    // Auth
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    me: "/auth/me",
    // Projects 
    createProject: "/projects",
    updateProject: "/projects/:{id}",
    deleteProject: "/projects/:{id}",
    getProject: (id: string) => `/projects/${id}`,
    getProjects: "/projects",
    joinProject: (id: string) => `/projects/${id}/join`,
    leaveProject: (id: string) => `/projects/${id}/leave`,
    // Labels
    createLabel: "/labels",
    deleteLabel: (id: string) => `/labels/${id}`,
    getLabels: (id: string) => `/labels/${id}`,
    // Tasks
    createTask: (projectId: string) => `/projects/${projectId}/tasks`,
    getTasks: (projectId: string) => `/projects/${projectId}/tasks`,
    getTask: ({projectId, taskId}:{projectId: string, taskId: string}) => `/projects/${projectId}/tasks/${taskId}`,
    deleteTask: ({projectId, taskId}: {projectId:string, taskId: string}) => `/projects/${projectId}/tasks/${taskId}`,
    editTask: ({projectId, taskId}: {projectId:string, taskId: string}) => `/projects/${projectId}/tasks/${taskId}`,
    // Users
    getUsers: (projectId: string) => `/users/${projectId}`,
}