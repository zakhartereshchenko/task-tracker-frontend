import { useEffect } from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthStore } from "../store/auth.store";
import { AuthButtons } from "./AuthButtons"
import { Button } from "./ui/button";
import { Container } from "./layouts";
import { Avatar } from "./Avatar";

export const Header = () => {
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
                    <h3>Logo</h3>

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