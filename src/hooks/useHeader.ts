import { useContext } from "react";
import { HeaderContext } from "../context/HeaderContext/HeaderContext";

export const useHeader = () => {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error("useHeader must be used within HeaderProvider");
  }

  return context;
};