import { endpoints } from "../constants/api";
import type { User } from "../types/projects";
import { api } from "../utils/api";

export const getUsers = (projectId: string) => api.get<User[]>(endpoints.getUsers(projectId));