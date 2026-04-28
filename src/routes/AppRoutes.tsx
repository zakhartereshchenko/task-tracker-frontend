import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, LoginPage, ProjectPage, ProjectsPage, TaskPage } from "../pages";
import { LayoutWithHeader } from "../components/layouts";
import { AuthGuard } from "./AuthGuard";
import { useAuth } from "../hooks/useAuth/useAuth";

export const AppRoutes = () => {
  const { data: user } = useAuth();

  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route element={<LayoutWithHeader />}>
          {/* restore when HomePage is ready */}
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<Navigate to={user ? "/projects" : "/login"} replace />} />
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