import { useEffect } from "react";
import { AuthButtons } from "./AuthButtons"
import { Button } from "./ui/button";
import { Container } from "./layouts";
import { Avatar } from "./Avatar";
import { useLogout } from "../hooks/useAuth/useLogout";
import { useHeader } from "../hooks/useHeader";
import { useAuth } from "../hooks/useAuth/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Header = () => {
    const navigate = useNavigate();

    const { backButton } = useHeader();
    const { data: user } = useAuth()

    const {mutateAsync, isPending } = useLogout();

    const handleLogout = async () => {
        try{
            await mutateAsync();
            navigate("/login");
            toast.success('Loged out successfully!')
        }catch(error){
            toast.error(`Something went wrong: ${error}`)
        }
    }
    
    return (
        <div className="border-b border-gray-300 border-dashed">
            <Container>
                <header className="flex items-center justify-between py-3">
                    <div className="flex flex-row gap-4">
                        <h3>Logo</h3>
                        {backButton}
                    </div>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span>Welcome, {user.username}!</span>
                            <Avatar name={user.username} />
                            <Button variant="outline" onClick={handleLogout}>
                                Logout
                            </Button>
                            
                        </div>
                    ) : (
                        <AuthButtons />
                    )}
                </header>
            </Container>
        </div>
        
    )
}