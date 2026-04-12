import z from "zod";

export const LOGIN_MODE = {
    SIGN_IN: 'sign-in',
    SIGN_UP: 'sign-up',
} as const;

export const createTaskSchema = z.object({
    title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title is too long"),

    description: z
    .string()
    .max(300, "Description is too long")
    .optional(),

    labels: z
    .array(z.string())
    .optional(),

    status: z
    .string(),

    priority: z
    .string(),

    assignee: z
    .string()
    .optional(),
})

export interface ITaskForm extends z.infer<typeof createTaskSchema> {}

export const createLabelSchema = z.object({
    label: z
    .string()
    .max(15, 'Lable title cannot be longer than 15')
})

export type TLabelForm = z.infer<typeof createLabelSchema>