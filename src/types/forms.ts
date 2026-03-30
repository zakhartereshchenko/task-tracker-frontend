import type { LOGIN_MODE } from "../constants/forms";

export interface LoginData {
    username: string
    password: string
}

export type TLoginMode = typeof LOGIN_MODE[keyof typeof LOGIN_MODE];