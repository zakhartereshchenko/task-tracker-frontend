import { FormProvider, useForm } from "react-hook-form";
import type { LoginData } from "../../types/forms";
import { AuthForm } from "./AuthForm";
import { useLogin } from "../../hooks/useAuth/useLogin";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";


export const SignInForm: React.FC = () => {
  const navigate = useNavigate();
    
    const form = useForm<LoginData>({
        mode: "onChange",
    });

    const { mutateAsync, data: user, isError, isPending } = useLogin();

    const handleSignIn = async (data: LoginData) => {
        try{
            await mutateAsync(data)
            toast.success("Signed in successfully" )
        }catch(error){
            toast.error(`${error}`)
            navigate("/login");
        }
    }

    useEffect(()=>{
        if(!user) return;

        navigate("/projects");
    },[user])

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
