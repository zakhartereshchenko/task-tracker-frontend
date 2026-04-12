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

    const handleJoin = async () => {
        try{
            await joinProject(projectId)
            toast.success('You joined the project')
        }catch{
            toast.error('Something went wrong')
        }
    }

    const handleEnter = () => {
        navigate(`/project/${projectId}`)
    }

    const handleClick = () => {
        if(isMember){
            handleEnter();
            return;
        }
        handleJoin();
    }
    
    return (
        <li className="border p-4 rounded flex items-center gap-4 justify-between">
            <div className="flex gap-4">
                <Avatar name={name} />
                <div className="min-w-0">
                    <h3 className="truncate text-lg">{name}</h3>
                    <p className="truncate text-sm">{description}</p>
                </div>
            </div>
            <div className="flex flex-col">
                <Button className={clsx("ml-auto w-25", 
                    { "bg-green-600": isMember, })} 
                    disabled={isPending} onClick={handleClick}
                >
                    {isMember ? "Enter" : "Join"}
                </Button>
                <p>{membersCountLabel}</p>
            </div>
            
        </li>
    )
}