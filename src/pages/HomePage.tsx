import { Button } from "../components/ui/button"

export const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 h-[80vh]">
            <h1>Home Page</h1>
            <Button>Get started</Button>
        </div>
    )
}