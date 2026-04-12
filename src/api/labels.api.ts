import { endpoints } from "../constants/api";
import type { TLabelForm } from "../constants/forms";
import type { LabelResponse } from "../types/api";
import { api } from "../utils/api";

export const createLabel = (data: TLabelForm) => api.post(endpoints.createLabel, data);

export const deleteLabel = (id: string) => api.delete(`${endpoints.deleteLabel}/${id}`);

export const getLabels = (projectId: string) => api.get<LabelResponse[]>(endpoints.getLabels(projectId));