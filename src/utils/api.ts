import { apiClient } from "../api/client";

export const api = {
  get: <T>(url: string) => apiClient<T>(url),

  post: <T>(url: string, body?: unknown) =>
    apiClient<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(url: string, body?: unknown) =>
    apiClient<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <T>(url: string) =>
    apiClient<T>(url, {
      method: "DELETE",
    }),
};