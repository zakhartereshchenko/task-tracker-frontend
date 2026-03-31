import { Button } from "../../components/ui/button"
import { LOGIN_MODE } from "../../constants/forms";
import { SignInForm } from "../../components/forms/SignInForm";
import { SignUpForm } from "../../components/forms";
import { AnimatedTransition } from "./components/AnimatedTransition";
import bg from "../../assets/images/login-bg.jpg";
import { useLoginStore } from "../../store/login.store";

export const LoginPage = () => {
    const mode = useLoginStore(state => state.mode)
    const setMode = useLoginStore(state => state.setMode)
  
    return (
        <div className="flex flex-col items-center justify-center gap-5 h-screen">
            <div className="w-full justify-around">
                <div className="relative w-full h-screen overflow-hidden">
                    <AnimatedTransition mode={mode}>
                        <div className="w-1/2 h-full flex bg-cover bg-center bg-fit" style={{ backgroundImage: `url(${bg})` }}>
                            <div className="w-full flex flex-col gap-15 justify-center items-center">
                                <h2 className="text-white text-7xl">Welcome back</h2>
                                <div className="w-full max-w-md flex flex-col items-center p-9 bg-transparent backdrop-blur-2xl rounded-2xl border border-gray-50">
                                    <SignInForm />
                                </div>
                            </div>
                            <div className= "w-200 h-full bg-primary flex flex-col gap-4 justify-center items-center text-white text-2xl font-bold">
                                <h4>Don't have an account?</h4>
                                <Button
                                    variant="outline"
                                    className="text-primary hover:text-primary"
                                    onClick={() => setMode(LOGIN_MODE.SIGN_UP)}
                                >
                                    Sign up
                                </Button>
                            </div>
                        </div>

                        <div className="w-1/2 h-full flex bg-cover bg-center bg-fit" style={{ backgroundImage: `url(${bg})` }}>
                            <div className= "w-200 h-full bg-primary flex flex-col gap-4 justify-center items-center text-white text-2xl font-bold">
                                <h4>Already have an account?</h4>
                                <Button
                                    variant="outline"
                                    className="text-primary hover:text-primary"
                                    onClick={() => setMode(LOGIN_MODE.SIGN_IN)}
                                >
                                    Sign in
                                </Button>
                            </div>
                            <div className="w-full h-full flex">
                                <div className="w-full flex flex-col gap-15 justify-center items-center">
                                    <h2 className="text-white text-7xl">Registration</h2>
                                    <div className="w-full max-w-md flex flex-col items-center p-9 bg-transparent backdrop-blur-2xl rounded-2xl border border-gray-50">
                                        <SignUpForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedTransition>
                </div>
            </div>
        </div>
    )
}