import { TaskPriority, TaskStatus } from "../types/projects";

export const pluralize = (
  count: number,
  singular: string,
  plural: string
): string => {
  return count === 1 ? singular : plural;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export const getFormattedPriorityTextAndColor = (value: TaskPriority) => {
    switch(value){
        case TaskPriority.LOW:
            return {text: 'Low', color: 'bg-blue-300'}
        case TaskPriority.MEDIUM:
            return {text: 'Medium', color: 'bg-yellow-600'}
        case TaskPriority.HIGH:
            return {text: 'High', color: 'bg-red-500'}
        default:
            const _:never = value;
            throw new Error(`Unhandled priority: ${value}`);
    }
}

export const getFormattedStatusTextAndColor = (value: TaskStatus) => {
    switch(value){
        case TaskStatus.DONE:
            return {text: 'Done', color: "bg-green-500"}
        case TaskStatus.IN_PROGRESS:
            return {text: 'In progress', color: "bg-blue-500"}
        case TaskStatus.IN_REVIEW:
            return {text: 'In review', color: "bg-yellow-600"}
        case TaskStatus.TODO:
            return {text: 'To do', color:"bg-gray-500"}
        default:
            const _:never = value;
            throw new Error(`Unhandled status: ${value}`);
    }
}