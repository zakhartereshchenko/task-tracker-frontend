import { Field } from "../../ui/field"
import { Skeleton } from "../../ui/skeleton"

export const EditTaskFormSkeleton = () => {
    return (
        <div className="flex gap-6">
            <div className="flex flex-col flex-1 gap-3.5">
                <Field>
                    <Skeleton />
                </Field>
                <Field className="relative">
                    <Skeleton />
                </Field>
            </div>
            <div className="w-70 flex flex-col gap-5">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
        </div>
    )
}