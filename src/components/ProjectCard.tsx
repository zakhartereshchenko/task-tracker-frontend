import { toast } from "sonner";
import { useJoinProject } from "../hooks/useProjects/useJoinProject";
import { Avatar } from "./Avatar"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom";
import { pluralize } from "../utils/ui";
import clsx from "clsx";

interface IProps {
    projectId: string;
    name: string;
    description?: string;
    membersCount: number;
    isMember: boolean;
}

export const ProjectCard: React.FC<IProps> = ({ projectId, name, description, membersCount, isMember}) => {
    const navigate = useNavigate();
    const {mutateAsync: joinProject, isPending } = useJoinProject();

    const membersCountLabel = membersCount > 0 ? `${membersCount} ${pluralize(membersCount, 'member', 'members')}` : 'No members'

    const handleEnter = () => {
        navigate(`/projects/${projectId}`)
    }

    const handleClick = async () => {
        if(isMember){
            handleEnter();
            return;
        }
        await joinProject(projectId)
    }
    
    return (
        <li className="border p-4 rounded flex flex-col gap-4 justify-between w-full">
            <div className="flex items-center gap-4 w-full">
                <Avatar name={name} />
                <div className="min-w-0">
                    <h3 className="w-full truncate text-lg" >{name}</h3>
                </div>
            </div>
            <p className="truncate text-sm">{description}</p>
            <div className="flex">
                <p>{membersCountLabel}</p>
                <Button className={clsx("ml-auto w-25", 
                    { "bg-green-600": isMember, })} 
                    disabled={isPending} onClick={handleClick}
                >
                    {isMember ? "Enter" : "Join"}
                </Button>
            </div>
            
        </li>
    )
}