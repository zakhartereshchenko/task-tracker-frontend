import { Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, ProjectPage, ProjectsPage, TaskPage } from "../pages";
import { LayoutWithHeader } from "../components/layouts";
import { AuthGuard } from "./AuthGuard";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route element={<LayoutWithHeader />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<ProjectPage />} />
            <Route path="/projects/:projectId/:taskId" element={<TaskPage />} />
        </Route>
      </Route>

        {/* Pages without header */}
        <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};