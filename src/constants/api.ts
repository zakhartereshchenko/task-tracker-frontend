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
}