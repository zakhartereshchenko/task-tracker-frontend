import { FormProvider, useForm } from "react-hook-form";
import type { LoginData } from "../../types/forms";
import { AuthForm } from "./AuthForm";
import { useLogin } from "../../hooks/useAuth/useLogin";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export const SignInForm: React.FC = () => {
  const navigate = useNavigate();
    
    const form = useForm<LoginData>({
        mode: "onChange",
    });

    const { mutateAsync, data: user, isPending } = useLogin();

    const handleSignIn = async (data: LoginData) => {
        try{
            await mutateAsync(data)
            toast.success("Signed in successfully" )
            navigate("/projects");
        }catch(error){
            toast.error(`${error} error`)
            navigate("/login");
        }
    }
    // console.log(user)
    // useEffect(()=>{
    //     if(!user) return;

    //     navigate("/projects");
    // },[user, navigate])

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
