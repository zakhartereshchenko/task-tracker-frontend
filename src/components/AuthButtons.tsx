import { useLoginStore } from "../store/login.store";
import { Button } from "./ui/button"
import { useNavigate } from 'react-router-dom';

export const AuthButtons = () => {
    const navigate = useNavigate();

    const setLoginMode = useLoginStore(state => state.setMode)
    
    const handleLogin = () => {
        setLoginMode("sign-in");
        navigate('/login');
    }

    const handleRegister = () => {
        setLoginMode("sign-up");
        navigate('/login');
    }

    return (
        <div className="flex gap-2">
            <Button variant="outline" onClick={handleLogin}>Login</Button>
            <Button onClick={handleRegister}>Register</Button>
        </div>
    )
}