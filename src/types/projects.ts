export interface IProjectListItem {
    id: string;
    name: string;
    description?: string;
    membersCount: number;
    isMember: boolean;
    createdAt: string;
}

// export interface ITask {
//     id: string;
//     title: string;
//     description?: string;
//     status: typeof TaskStatus[keyof typeof TaskStatus];
//     priority: typeof TaskPriority[keyof typeof TaskPriority];
//     creator: User;
//     labels: string[];
//     assignee?: User;
//     createdAt: string;
//     updatedAt: string;
// }

export interface User {
    id: string;
    username: string;
}

export interface TaskLabel {
    text: string;
    color: string;
}

export const TaskStatus = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  IN_REVIEW: 'IN_REVIEW',
  DONE: 'DONE'
} as const

export const TaskStatusArray = Object.values(TaskStatus)

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const TaskStatusLabels: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "To do",
  [TaskStatus.IN_PROGRESS]: "In progress",
  [TaskStatus.IN_REVIEW]: "In review",
  [TaskStatus.DONE]: "Done",
};

export const TaskPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const

export const TaskPriorityArray = Object.values(TaskPriority)

export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];

export const TaskPriorityLabels: Record<TaskPriority, string> = {
  [TaskPriority.HIGH]: 'High',
  [TaskPriority.MEDIUM]: 'Medium',
  [TaskPriority.LOW]: 'Low',
}