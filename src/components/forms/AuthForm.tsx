import type { UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useEffect } from "react";

type AuthFormData = {
  username: string;
  password: string;
};

interface IProps {
    form: UseFormReturn<AuthFormData>;
    onSubmit: (data: AuthFormData) => void;
    submitText?: string;
}

export const AuthForm = ({ form, onSubmit, submitText }: IProps) => {

    const { register, handleSubmit, formState: { errors } } = form;
    
    useEffect(() => {
        console.log("errors changed:", errors);
    }, [errors]);
    
    return (
        <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-7">
                <Field className="relative">
                    <FieldLabel htmlFor="form-username">Username</FieldLabel>
                    <Input
                        id="form-username"
                        type="text"
                        placeholder="Write your username..."
                        {...register("username", { required: "Username is required", minLength: { value: 3, message: "Username must be at least 3 characters" } })}
                    />
                    {errors.username && (
                        <FieldError className="absolute -bottom-5">
                            {errors.username?.message as string}
                        </FieldError>
                    )}
                </Field>

                <Field className="relative">
                    <FieldLabel htmlFor="form-password">Password</FieldLabel>
                    <Input 
                        id="form-password" 
                        type="password" 
                        placeholder="Write your password..." 
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
                        {submitText || "Submit"}
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}