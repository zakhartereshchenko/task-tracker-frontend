import { useFormContext, useFormState } from "react-hook-form";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

type AuthFormData = {
  username: string;
  password: string;
};

interface IProps {
    onSubmit: (data: AuthFormData) => void;
    submitText?: string;
    isSending?: boolean;
}

export const AuthForm = ({ onSubmit, submitText, isSending }: IProps) => {

    const { register, handleSubmit, control } =  useFormContext<AuthFormData>();

    const { errors } = useFormState({ control });
    
    return (
        <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-7">
                <Field className="relative" data-invalid={!!errors.username}>
                    <FieldLabel htmlFor="form-username" className="text-white">
                        Username
                    </FieldLabel>
                    <Input
                        id="form-username"
                        type="text"
                        placeholder="Write your username..."
                        className="text-white"
                        aria-invalid={!!errors.username}
                        {...register("username", { required: "Username is required", minLength: { value: 3, message: "Username must be at least 3 characters" } })}
                    />
                    {errors.username && (
                        <FieldError className="absolute -bottom-5">
                            {errors.username?.message as string}
                        </FieldError>
                    )}
                </Field>

                <Field className="relative">
                    <FieldLabel htmlFor="form-password" className="text-white">Password</FieldLabel>
                    <Input 
                        id="form-password" 
                        type="password" 
                        placeholder="Write your password..." 
                        className="text-white"
                        {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} 
                    />
                    {errors.password && (
                        <FieldError className="absolute -bottom-5">
                            {errors.password?.message as string}
                        </FieldError>
                    )}
                </Field>
                
                <Field orientation="horizontal">
                    <Button type="submit" className="w-full">
                        {isSending ? <Spinner className="size-4" /> : submitText}
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}