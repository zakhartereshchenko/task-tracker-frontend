import { endpoints } from "../constants/api";
import type { IAuthData } from "../types/api";
import { apiClient } from "./client";

export const login = (data: IAuthData) =>
    apiClient(endpoints.login, {
    method: "POST",
    body: JSON.stringify(data),
});

export const register = (data: IAuthData) =>
    apiClient(endpoints.register, {
    method: "POST",
    body: JSON.stringify(data),
});

export const logout = () =>
    apiClient(endpoints.logout, {
    method: "POST",
});

export const checkAuth = () => 
    apiClient(endpoints.me, {
    method: "GET",
});