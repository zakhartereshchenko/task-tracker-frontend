import type { IProject } from "../pages/ProjectsPage";
import { Avatar } from "./Avatar";
import { Button } from "./ui/button";

interface IProps {
    projects?: IProject[];
}

export const ProjectsGridView: React.FC<IProps> = ({ projects }) => {
    const emptyProjectList =!projects || projects.length === 0

    const projectsLength = projects?.length

    const amountOfProjectsLabel = projectsLength === 1 ? "1 project" : `${projectsLength} projects`
    
    return (
        <div className="flex items-center justify-center">
            {emptyProjectList 
            ? <p className="text-gray-500">No projects found.</p>
            : <div className="flex flex-col">
                <p className="text-gray-500">{amountOfProjectsLabel}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects?.map((project) => (
                        <li key={project.id} className="border p-4 rounded flex items-center gap-4">
                            <Avatar name={project.name} />
                            <div className="min-w-0">
                                <h3 className="truncate text-lg">{project.name}</h3>
                                <p className="truncate text-sm">{project.description}</p>
                            </div>
                            <Button className="ml-auto">Join</Button>
                        </li>
                    ))}
                </ul>
            </div>
            }
        </div>
    )
}