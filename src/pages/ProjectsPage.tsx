import { ProjectsFilters, ProjectsGridView, Title } from "../components"
import { PageContainer } from "../components/layouts/Container"
import { useGetProjects } from "../hooks/useProjects/useGetProjects"
import { useDebounce } from "../hooks/useDebounce"
import { useSearchParams } from "react-router-dom"

export const ProjectsPage = () => {
    const [searchParams] = useSearchParams();
    
    const search = searchParams.get("search") || "";

    const debauncedQuery = useDebounce(search, 500)

    const { data: projects, isPending } = useGetProjects({ filterQuery: debauncedQuery });

    const projectsCount = projects?.length

    const myProjects = projects?.filter(project => project.isMember)
    const availableProjects = projects?.filter(project => !project.isMember)

    return (
        <PageContainer>
            <Title label="Projects" isLoading={isPending} badgeCount={projectsCount} subTitle="Choose the project or join available projects" />
            <ProjectsFilters />
            <ProjectsGridView title='My projects' projects={myProjects} isLoading={isPending} />
            <ProjectsGridView title='Available projects' projects={availableProjects} isLoading={isPending} />
        </PageContainer>
    )
}