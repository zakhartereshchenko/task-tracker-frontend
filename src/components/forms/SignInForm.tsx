import { useForm } from "react-hook-form";
import type { LoginData } from "../../types/forms";
import { AuthForm } from "./AuthForm";
import { useLogin } from "../../hooks/useLogin";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";


export const SignInForm: React.FC = () => {
    
    const form = useForm<LoginData>();

    const { mutateAsync, data, isError, isPending } = useLogin();

    const handleSignIn = (data: LoginData) => {
        mutateAsync(data)
        .then(()=> toast.success("Signed in successfully" ))
        .catch((error)=> toast.error(`${error.error}` ))
    }

    if(isPending) {
        return (
            <Spinner className="size-8" />
        )
    }

    return (
        <AuthForm 
            form={form}
            onSubmit={handleSignIn}
            submitText="Sign In"
        />
    )
}
