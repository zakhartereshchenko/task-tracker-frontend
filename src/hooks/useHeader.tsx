import { useContext } from "react";
import { createContext, useState, type ReactNode } from "react";

type HeaderContextType = {
  backButton?: ReactNode;
  setBackButton: (backButton: ReactNode) => void;
};

export const HeaderContext = createContext<HeaderContextType | null>(null);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [backButton, setBackButton] = useState<ReactNode>(null);

  return (
    <HeaderContext.Provider
      value={{
        backButton,
        setBackButton
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error("useHeader must be used within HeaderProvider");
  }

  return context;
};