import { apiClient } from "../api/client";
import type { IQuery } from "../types/api";

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

export const buildEndpoint = ({
  url,
  queries,
}: {
  url: string;
  queries?: IQuery[];
}) => {
  if (!queries?.length) return url;

  const params = new URLSearchParams();

  queries.forEach(({ name, value }) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      if (value.length) {
        params.set(name, value.join(","));
      }
    } else {
      params.set(name, value);
    }
  });

  const queryString = params.toString();

  return queryString ? `${url}?${queryString}` : url;
};