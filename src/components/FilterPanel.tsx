import { Button } from "./ui/button"
import { Input } from "./ui/input"


export const FilterPanel = () => {
    return (
        <div className="flex items-center justify-between">
            <Input placeholder="Search..." className="max-w-70"/>
            <Button variant="outline" className="">
                Create project
            </Button>
        </div>
    )
}