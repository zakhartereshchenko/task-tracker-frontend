import type { ColumnDef } from "@tanstack/react-table"
import type { ITask } from "../../types/api"
import { Badge } from "../ui/badge"
import { TaskPriority, TaskStatus } from "../../types/projects"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import { useDeleteTask } from "../../hooks/useTasks/useDeleteTask"
import { ActionsColumn } from "./ActionsColumn"

const getFormattedPriorityTextAndColor = (value: TaskPriority) => {
    switch(value){
        case TaskPriority.LOW:
            return {text: 'Low', color: 'bg-blue-300'}
        case TaskPriority.MEDIUM:
            return {text: 'Medium', color: 'bg-yellow-300'}
        case TaskPriority.HIGH:
            return {text: 'High', color: 'bg-red-400'}
        default:
            const _:never = value;
            throw new Error(`Unhandled priority: ${value}`);
    }
}

const getFormattedStatusTextAndColor = (value: TaskStatus) => {
    switch(value){
        case TaskStatus.DONE:
            return {text: 'Done', color: "bg-green-300"}
        case TaskStatus.IN_PROGRESS:
            return {text: 'In progress', color: "bg-blue-300"}
        case TaskStatus.IN_REVIEW:
            return {text: 'In review', color: "bg-yellow-200"}
        case TaskStatus.TODO:
            return {text: 'To do', color:"bg-gray-200"}
        default:
            const _:never = value;
            throw new Error(`Unhandled status: ${value}`);
    }
}

export const columns: ColumnDef<ITask>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="w-[150px] truncate font-medium">
          {row.getValue("title")}
        </div>
      )
    },
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;

      return (
        <div 
            className="w-[150px] truncate font-medium" 
            title={description}
        >
          {description || "—" }
        </div>
      )
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as TaskStatus
      const {text, color} = getFormattedStatusTextAndColor(status)

      return (
        <Badge variant="secondary" className={`${color}`}>
          {text}
        </Badge>
      )
    },
  },

  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as TaskPriority
      const {text, color} = getFormattedPriorityTextAndColor(priority)

      return (
        <Badge variant="secondary" className={`${color}`}>
          {text}
        </Badge>
      )
    },
  },

  {
    id: "labels",
    header: "Labels",
    cell: ({ row }) => {
      const labels = row.original.labels

      return (
        <div className="flex flex-wrap gap-1">
          {labels && labels.length ? labels.map((label) => (
            <Badge
              key={label.id}
              style={{ backgroundColor: label.color || undefined }}
              className="text-white"
            >
              {label.name}
            </Badge>
          )) : "—"}
        </div>
      )
    },
  },

  {
    id: "assignee",
    header: "Assignee",
    cell: ({ row }) => {
      const assignee = row.original.assignee

      return (
        <div className="text-sm">
          {assignee?.username || "—"}
        </div>
      )
    },
  },

  {
    id: "reporter",
    header: "Reporter",
    cell: ({ row }) => {
      const reporter = row.original.createdBy

      return (
        <div className="text-sm">
          {reporter?.username || "—"}
        </div>
      )
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))

      return (
        <div className="text-sm text-muted-foreground">
          {date.toLocaleDateString()}
        </div>
      )
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
        const task = row.original

        return <ActionsColumn task={task} />
    },
    }
]