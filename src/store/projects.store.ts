import { create } from "zustand";
import type { IProjectListItem } from "../types/projects";

type ProjectsState = {
    projects: IProjectListItem[] | [];
    setProjects: (projects: IProjectListItem[]) => void;
};

export const useProjectsStore = create<ProjectsState>((set) => ({
    projects: [],
    setProjects: (projects) => set({ projects })
}));