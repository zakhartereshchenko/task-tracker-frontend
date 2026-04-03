import { endpoints } from "../constants/api";
import type { User } from "../store/auth.store";
import type { IAuthData, ILoginResponse } from "../types/api";
import { api } from "../utils/api";

export const login = (data: IAuthData): Promise<ILoginResponse> => api.post(endpoints.login, data)

export const register = (data: IAuthData): Promise<ILoginResponse> => api.post(endpoints.register, data)

export const logout = () => api.post(endpoints.logout);

export const checkAuth = () => api.get<User>(endpoints.me);