import { Controller, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Field, FieldDescription, FieldError, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react"
import { TaskPriority, TaskPriorityArray, TaskStatus, TaskStatusArray, TaskStatusLabels } from "../../types/projects"
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "../ui/multi-select"
import { CreateNewLabelForm } from "./CreateNewLabelForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createTaskSchema, type ITaskForm } from "../../constants/forms"
import { useGetLabels } from "../../hooks/useLabels/useGetLabels"
import { useParams } from "react-router-dom"
import { useCreateTask } from "../../hooks/useTasks/useCreateTask"
import type { ICreateTask } from "../../api/tasks.api"
import { toast } from "sonner"

export const CreateTaskForm = () => {
    const { projectId } = useParams();
 
    const [open, setOpen] = useState(false);
    
    const { register, handleSubmit, formState: { errors }, control } = useForm<z.infer<typeof createTaskSchema>>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            status: TaskStatus.TODO,
            priority: TaskPriority.MEDIUM,
            labels: [],
        },
    })

    const { data: labels, isPending: isPendingLabel } = useGetLabels(projectId ?? "");

    const { mutateAsync: createTask, isPending: isPendingTask } = useCreateTask();

    const submit = async(data: ITaskForm) => {
        if(!projectId) return

        const obj: ICreateTask = {
            body: data,
            projectId: projectId,
        }
        
        try{
            await createTask(obj)
            toast.success("Project created successfully");
            setOpen(false);
        }catch(error){
            toast.error(`Failed to create project: ${error}`);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create new task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3.5">
                    <DialogHeader>
                        <DialogTitle>Create new task</DialogTitle>
                        <DialogDescription>
                            Create a new task.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field data-invalid={!!errors.title} className="relative">
                            <Label htmlFor="title">Title</Label>
                            <Input {...register("title")} aria-invalid={!!errors.title} id="title" name="title" placeholder="Write title..." />
                            {errors.title && (
                                <FieldError className="absolute -bottom-5">
                                    {errors.title?.message as string}
                                </FieldError>
                            )}
                        </Field>

                        <Field>
                            <Label htmlFor="description">Description</Label>
                            <Input {...register("description")} id="description" name="description" placeholder="Write project description..." />
                        </Field>

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

                        <CreateNewLabelForm />

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
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            )}
                        />
                        
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">
                            Create
                        </Button>
                    </DialogFooter>  
                </form>
            </DialogContent>
        </Dialog>
    )
}