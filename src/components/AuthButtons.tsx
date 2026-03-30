import { Button } from "./ui/button"
import { useNavigate } from 'react-router-dom';

export const AuthButtons = () => {
    const navigate = useNavigate();
    return (
        <div className="flex gap-2">
            <Button variant="outline" onClick={()=>navigate('/login')}>Login</Button>
            <Button onClick={()=>navigate('/login')}>Register</Button>
        </div>
    )
}