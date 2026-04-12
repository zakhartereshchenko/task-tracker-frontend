import { Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, ProjectPage, ProjectsPage, TaskPage } from "../pages";
import { LayoutWithHeader } from "../components/layouts";

export const AppRoutes = () => {
  return (
    <Routes>
        <Route element={<LayoutWithHeader />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/project/:projectId" element={<ProjectPage />} />
            <Route path="/project/:projectId/:taskId" element={<TaskPage />} />
        </Route>

        {/* Pages without header */}
        <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};