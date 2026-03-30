import { Filter } from "lucide-react"
import { FilterPanel, ProjectsGridView } from "../components"
import { PageContainer } from "../components/layouts/Container"
import { Input } from "../components/ui/input"

export interface IProject {
    id: number
    name: string
    description?: string
}
const projects: IProject[] = [{
    id: 1,
    name: "Project 1",
    description: "Description for project 1"
}, {
    id: 2,
    name: "Project 2",
    description: "Description for project 2"
},{
    id: 3,
    name: "Project 3",
    description: "DescriptionDescriptioDescription for projectn forDescription for project project for Description for projectDescription for projectproject 2"
}]

export const ProjectsPage = () => {
    return (
        <PageContainer>
            <h1>Projects list</h1>
            <FilterPanel />
            <ProjectsGridView projects={projects} />
        </PageContainer>
    )
}