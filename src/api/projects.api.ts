import { endpoints } from "../constants/api";
import type { ProjectResponse } from "../types/api";
import type { IProjectForm } from "../types/forms";
import type { IProjectListItem } from "../types/projects";
import { api } from "../utils/api";

export const createProject = (data: IProjectForm) => api.post(endpoints.createProject, data);

export const updateProject = (data: Partial<IProjectForm>) => api.put(endpoints.updateProject, data);

export const deleteProject = (id: string) => api.delete(`${endpoints.deleteProject}/${id}`);

export const getProject = (id: string) => api.get<ProjectResponse>(`${endpoints.getProject(id)}`);

export const getProjects = (query?: string) => api.get<IProjectListItem[]>(`${endpoints.getProjects}${query ? `?name=${query}` : ''}`);

export const joinProject = (id: string) => api.post(`${endpoints.joinProject(id)}`);

export const leaveProject = (id: string) => api.post(`${endpoints.leaveProject(id)}`);