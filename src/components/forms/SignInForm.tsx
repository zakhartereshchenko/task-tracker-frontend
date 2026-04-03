import { FormProvider, useForm } from "react-hook-form";
import type { LoginData } from "../../types/forms";
import { AuthForm } from "./AuthForm";
import { toast } from "sonner";
import { useLogin } from "../../hooks/useAuth/useLogin";


export const SignInForm: React.FC = () => {
    
    const form = useForm<LoginData>({
    mode: "onChange", // или "onBlur"
    });

    const { mutateAsync, data, isError, isPending } = useLogin();

    const handleSignIn = (data: LoginData) => {
        mutateAsync(data)
        .then(()=> toast.success("Signed in successfully" ))
        .catch((error)=> toast.error(`${error.error}` ))
    }

    return (
        <FormProvider {...form}>
            <AuthForm
                onSubmit={handleSignIn}
                submitText="Sign In"
                isSending={isPending}
            />
        </FormProvider>
    )
}
