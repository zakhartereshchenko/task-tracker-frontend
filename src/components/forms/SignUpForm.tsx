import { FormProvider, useForm } from "react-hook-form";
import type { LoginData } from "../../types/forms";
import { AuthForm } from "./AuthForm";
import { useRegister } from "../../hooks/useAuth/useRegister";

export const SignUpForm: React.FC = () => {
    
    const form = useForm<LoginData>({
        mode: "onChange",
    });

    const { mutateAsync, data, isPending, isError } = useRegister();

    const handleSignUp = async (data: LoginData) => {
        try{
            await mutateAsync(data)
        }catch(error){

        }
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
