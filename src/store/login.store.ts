import { create } from "zustand";
import type { TLoginMode } from "../types/forms";
import { LOGIN_MODE } from "../constants/forms";

type AuthState = {
    mode: TLoginMode;
    setMode: (mode: TLoginMode) => void;
};

export const useLoginStore = create<AuthState>((set) => ({
    mode: LOGIN_MODE.SIGN_IN,
    setMode: (mode) => set({ mode })
}));