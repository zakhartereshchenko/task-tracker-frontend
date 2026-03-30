import { useState } from "react";
import { Button } from "../../components/ui/button"
import { type TLoginMode } from "../../types/forms";
import { LOGIN_MODE } from "../../constants/forms";
import { SignInForm } from "../../components/forms/SignInForm";
import { SignUpForm } from "../../components/forms";
import { AnimatedTransition } from "./components/AnimatedTransition";

export const LoginPage = () => {
    const [mode, setMode] = useState<TLoginMode>(LOGIN_MODE.SIGN_IN);
  
    return (
        <div className="flex flex-col items-center justify-center gap-5 h-screen">
            <div className="w-full justify-around">
                <div className="relative w-full h-screen overflow-hidden">
                    <AnimatedTransition mode={mode}>
                        <div className="w-1/2 h-full flex">
                            <div className="w-full flex justify-center items-center">
                                <div className="w-full max-w-sm flex flex-col items-center">
                                    <SignInForm />
                                </div>
                            </div>
                            <div className= "w-200 h-full bg-red-500 flex flex-col justify-center items-center text-white text-2xl font-bold">
                                <h3>Already have an account?</h3>
                                <Button
                                    onClick={() => setMode(LOGIN_MODE.SIGN_UP)}
                                >
                                    Sign up
                                </Button>
                            </div>
                        </div>

                        <div className="w-1/2 h-full flex">
                            <div className= "w-200 h-full bg-red-500 flex flex-col justify-center items-center text-white text-2xl font-bold">
                                <h3>Don't have an account?</h3>
                                <Button
                                    onClick={() => setMode(LOGIN_MODE.SIGN_IN)}
                                >
                                    Sign in
                                </Button>
                            </div>
                            <div className="w-full h-full flex">
                                <div className="w-full flex justify-center items-center">
                                    <div className="w-full max-w-sm flex flex-col items-center">
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