import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Field, FieldError, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import type { IProjectForm } from "../../types/forms"
import { useCreateProject } from "../../hooks/useProjects/useCreateProject"
import { useState } from "react"

export const CreateProjectForm = () => {
    const [open, setOpen] = useState(false);
    
    const { register, handleSubmit, formState: { errors } } = useForm<IProjectForm>()

    const { mutateAsync: createProject, isPending } = useCreateProject();

    const submit = async(data: IProjectForm) => {
        try{
            await createProject(data)
            setOpen(false);
        }catch(error){
            
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3.5">
                    <DialogHeader>
                        <DialogTitle>Create project</DialogTitle>
                        <DialogDescription>
                            Create a new project by filling in the details below.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field data-invalid={!!errors.name} className="relative">
                            <Label htmlFor="name">Name</Label>
                            <Input {...register("name", { required: "Name is required" })} id="name" name="name" placeholder="Write project name..." />
                            {errors.name && (
                                <FieldError className="absolute -bottom-5">
                                    {errors.name?.message as string}
                                </FieldError>
                            )}
                        </Field>
                        <Field>
                            <Label htmlFor="description">Description</Label>
                            <Input {...register("description")} id="description" name="description" placeholder="Write project description..." />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Creating..." : "Create"}
                        </Button>
                    </DialogFooter>  
                </form>
            </DialogContent>
        </Dialog>
    )
}