import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import { AuthButtons } from "./AuthButtons"
import { Button } from "./ui/button";
import { Container } from "./layouts";
import { Avatar } from "./Avatar";
import { useLogout } from "../hooks/useAuth/useLogout";
import { useHeader } from "../hooks/useHeader";

export const Header = () => {
    const { backButton } = useHeader();
    const user = useAuthStore((store) => store.user);

    useEffect(() => {
        console.log("Current user:", user);
    }, [user]);

    const {mutateAsync, isPending } = useLogout();

    const handleLogout = async () => {
        await mutateAsync();
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