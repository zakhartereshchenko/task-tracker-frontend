import { Outlet } from "react-router-dom";
import { Header } from "../Header";

export const LayoutWithHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};