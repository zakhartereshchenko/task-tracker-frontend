import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Field, FieldError, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react"
import z from "zod"
import { createLabelSchema } from "../../constants/forms"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateLabel } from "../../hooks/useLabels/useCreateLabel"
import { useParams } from "react-router-dom"

export const CreateNewLabelForm = () => {
    const { projectId } = useParams();

    const [open, setOpen] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof createLabelSchema>>({
        resolver: zodResolver(createLabelSchema),
    })

    const { mutateAsync: createLabel, isPending } = useCreateLabel();

    const handleCreateLabel = async (data: z.infer<typeof createLabelSchema>) => {
        const body = {
            ...data,
            projectId: projectId
        }
        try {
            await createLabel(body)
            reset()
            setOpen(false)
        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create new label</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSubmit(handleCreateLabel)(e)
                    }
                    }
                    className="flex flex-col gap-3.5"
                >
                    <DialogHeader>
                        <DialogTitle>Create new label</DialogTitle>
                        <DialogDescription>
                            Create a new label.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field data-invalid={!!errors.label} className="relative">
                            <Label htmlFor="title">Title</Label>
                            <Input {...register("label")} id="label" name="label" placeholder="Write text..." />
                            {errors.label && (
                                <FieldError className="absolute -bottom-5">
                                    {errors.label?.message as string}
                                </FieldError>
                            )}
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">
                            Create new label
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}