import { useEffect } from "react"
import { Field, FieldDescription, FieldError } from "../../ui/field"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Controller, useForm } from "react-hook-form"
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "../../ui/multi-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { TaskPriority, TaskPriorityArray, TaskPriorityLabels, TaskStatus, TaskStatusArray, TaskStatusLabels } from "../../../types/projects"
import { taskSchema, type ITaskForm } from "../../../constants/forms"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGetLabels } from "../../../hooks/useLabels/useGetLabels"
import { useParams } from "react-router-dom"
import { Textarea } from "../../ui/textarea"
import { useGetTask } from "../../../hooks/useTasks/useGetTask"
import { useGetUsers } from "../../../hooks/useGetUsers/useGetUsers"
import { useAuth } from "../../../hooks/useAuth/useAuth"
import { formatDate } from "../../../utils/ui"
import { useEditTask } from "../../../hooks/useTasks/useEditTask"
import { Button } from "../../ui/button"
import { EditTaskFormSkeleton } from "./Skeleton"
import { Spinner } from "../../ui/spinner"

export const EditTaskForm = () => {
    const { projectId = '', taskId = '' } = useParams();

    const { mutateAsync: editTask, isPending: isPendingEditing } = useEditTask()

    const {data: task, isPending: isPendingTask} = useGetTask({ projectId, taskId })

    console.log('taskId', taskId )
    console.log('projectId', projectId )
    console.log('task', task)

    const { data: labels, isPending: isPendingLabel } = useGetLabels(projectId ?? "");

    const { data: users, isPending: isPendingUsers } = useGetUsers(projectId ?? "");

    const { data: me, isPending: isPendingMe } = useAuth();
    
    const { register, handleSubmit, reset, formState: { errors, isDirty }, control } = useForm<ITaskForm>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: task?.title,
            description: task?.description,
            status: task?.status,
            priority: task?.priority,
            labels: task?.labels.map(label => label.id),
            assignee: task?.assignee?.id,
        },
    })

    // set initial state for react hook form
    useEffect(() => {
        if (!task) return

        reset({
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            labels: task.labels?.map(l => l.id),
            assignee: task.assignee?.id
        })
    }, [task, reset])

    const submit = async(data: ITaskForm) => {
        try{
            await editTask({
                projectId, 
                taskId, 
                body: data
            })
        }catch(error){
            console.warn(error)
        }
    }

    if(isPendingTask){
        return <EditTaskFormSkeleton />
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="flex gap-6">
            <div className="flex flex-col flex-1 gap-3.5">
                <Field data-invalid={!!errors.title} className="relative">
                    <Input {...register("title")} aria-invalid={!!errors.title} id="title" name="title" placeholder="Write title..." className="!text-xl"/>
                    {errors.title && (
                        <FieldError className="absolute -bottom-5">
                            {errors.title?.message as string}
                        </FieldError>
                    )}
                </Field>
                <Field data-invalid={!!errors.title} className="relative">
                    <Textarea {...register("description")} aria-invalid={!!errors.title} id="description" name="description" placeholder="Write description..." className="!text-l resize-none min-h-70"/>
                </Field>
            </div>
            <div className="w-70 flex flex-col gap-5">
                <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                        <Field>
                            <Label>Status</Label>
                            <FieldDescription>
                                Select task status
                            </FieldDescription>
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                defaultValue={TaskStatus.TODO}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status..." />
                                </SelectTrigger>

                                <SelectContent position="popper">
                                    {TaskStatusArray.map(label => (
                                        <SelectItem key={label} value={label}>
                                            {TaskStatusLabels[label]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />
                <Controller
                    control={control}
                    name="assignee"
                    render={({ field }) => (
                        <Field>
                            <Label>Assignee</Label>
                            <FieldDescription>
                                Select user to do a task (only users joined this project)
                            </FieldDescription>
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select user..." />
                                </SelectTrigger>

                                <SelectContent position="popper">
                                    {users && users.map(user => {
                                        const usernameLabel = user.username === me?.username ? `${user.username} (you)` : user.username

                                        return <SelectItem key={user.id} value={user.id}>
                                            {usernameLabel}
                                        </SelectItem>
                                    })}
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />
                <Controller
                    control={control}
                    name="labels"
                    render={({ field }) => (
                        <Field>
                            <Label htmlFor="labels">Labels</Label>
                            <MultiSelect
                                values={field.value}
                                onValuesChange={field.onChange}
                            >
                                <MultiSelectTrigger className="w-full">
                                    <MultiSelectValue placeholder="Select labels..." />
                                </MultiSelectTrigger>
                                <MultiSelectContent>
                                    <MultiSelectGroup>
                                        {labels && labels.map(label => (
                                            <MultiSelectItem key={label.id} value={label.id}>
                                                {label.name}
                                            </MultiSelectItem>
                                        ))}
                                    </MultiSelectGroup>
                                </MultiSelectContent>
                            </MultiSelect>
                        </Field>
                    )}
                />
                <Controller
                    control={control}
                    name="priority"
                    render={({ field }) => (
                        <Field>
                            <Label>Priority</Label>
                            <FieldDescription>
                                Select task priority
                            </FieldDescription>
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                defaultValue={TaskPriority.MEDIUM}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select priority..." />
                                </SelectTrigger>

                                <SelectContent position="popper">
                                    {TaskPriorityArray.map(label => (
                                        <SelectItem key={label} value={label}>
                                            {TaskPriorityLabels[label]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />
                <div>
                    <p>Published by: {task?.createdBy?.username}</p>
                    {task?.createdAt && <p>{formatDate(task?.createdAt)}</p>}
                </div>
                <Button disabled={!isDirty}>
                    {isPendingEditing ? <><Spinner /> Saving</> : 'Save changes'}
                </Button>
            </div>
        </form>
    )
}