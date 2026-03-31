import { FormProvider, useForm } from "react-hook-form";
import type { LoginData } from "../../types/forms";
import { useRegister } from "../../hooks/useRegister";
import { AuthForm } from "./AuthForm";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

export const SignUpForm: React.FC = () => {
    
    const form = useForm<LoginData>({
    mode: "onChange", // или "onBlur"
    });

    const { mutateAsync, data, isPending, isError } = useRegister();

    const handleSignUp = (data: LoginData) => {
        mutateAsync(data)
        .then(()=> toast.success("Signed up successfully" ))
        .catch((error)=> toast.error(`${error.error}` ))
    }

    return (
        <FormProvider {...form}>
            <AuthForm 
                onSubmit={handleSignUp}
                submitText="Sign Up"
                isSending={isPending}
            />
        </FormProvider>
    )
}
