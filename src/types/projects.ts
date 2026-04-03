export interface IProjectListItem {
    id: string;
    name: string;
    description?: string;
    membersCount: number;
    isMember: boolean;
    createdAt: string;
}

export interface ITask {
    id: string;
    title: string;
    description?: string;
    status: typeof TaskStatus;
    priority: typeof TaskPriority;
    creator: User;
    labels: TaskLabel;
    assignee: User;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    username: string;
}

interface TaskLabel {
    text: string;
    color: string;
}
const TaskStatus = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  IN_REVIEW: 'in-review',
  DONE: 'done'
}
const TaskPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
}