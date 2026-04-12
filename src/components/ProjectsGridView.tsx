import type { IProjectListItem } from "../types/projects";
import { Title } from "./Title";
import { ProjectCard } from "./ProjectCard";

interface IProps {
    title: string;
    projects?: IProjectListItem[];
    isLoading?: boolean;
}

export const ProjectsGridView: React.FC<IProps> = ({ title, projects, isLoading }) => {
    const emptyProjectList = !projects || projects.length === 0

    const projectsLength = projects?.length

    const amountOfProjectsLabel = projectsLength === 1 ? "1 project" : `${projectsLength} projects`
    
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col w-full">
                <Title label={title} badgeCount={projectsLength} subTitle={emptyProjectList ? "No projects found." : amountOfProjectsLabel} isLoading={isLoading}/>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects?.map((project) => {
                        const {id, name, description, membersCount, isMember} = project

                        return <ProjectCard 
                            key={id} 
                            projectId={id} 
                            name={name} 
                            description={description} 
                            membersCount={membersCount} 
                            isMember={isMember} 
                        />
                    })}
                </ul>
            </div>
        </div>
    )
}