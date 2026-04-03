import { Outlet } from "react-router-dom";
import { Header } from "../Header";

export const LayoutWithHeader = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 min-h-0">
        <Outlet />
      </main>
    </div>
  );
};