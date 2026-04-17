import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PageContainer } from "../components/layouts"
import { useGetProject } from "../hooks/useProjects/useGetProject";
import { TasksTable, Title } from "../components";
import { ProjectFilters } from "../components/ProjectFilters";
import { useHeader } from "../hooks/useHeader";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { useGetTasks } from "../hooks/useTasks/useGetTasks";

export const ProjectPage = () => {
    const navigate = useNavigate()
    const { projectId } = useParams();
    const { setBackButton } = useHeader()
    const [searchParams] = useSearchParams();

    const labelsQuery = searchParams.get("labels") ?? undefined;
    const statusQuery = searchParams.get("status") ?? undefined;
    const priorityQuery = searchParams.get("priority") ?? undefined;

    useEffect(()=>{
        setBackButton(<Button onClick={()=>navigate("/projects")}><ArrowBigLeft /> <span>back</span></Button>)
    },[])

    const {data: project, isPending} = useGetProject(projectId)

    const {data: tasks, isPending: isPendingTasks} = useGetTasks({projectId, labelsQuery, statusQuery, priorityQuery})

    const projectName = project?.name;
    const projectDescription = project?.description;

    const tasksCount = tasks?.length

    return (
        <PageContainer>
            <Title label={projectName} subTitle={projectDescription} isLoading={isPending} />
            <ProjectFilters />
            <Title label='Available tasks' isLoading={isPendingTasks} badgeCount={tasksCount} />
            {tasks && <TasksTable tasks={tasks} />}
        </PageContainer>
    )
}