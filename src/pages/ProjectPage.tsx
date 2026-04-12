import { useNavigate, useParams } from "react-router-dom";
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
    console.log(projectId)
    useEffect(()=>{
        setBackButton(<Button onClick={()=>navigate("/projects")}><ArrowBigLeft /> <span>back</span></Button>)
    },[])

    const {data: project, isPending} = useGetProject(projectId)

    const {data: tasks, isPending: isPendingTasks} = useGetTasks({projectId})

    const projectName = project?.name;
    const projectDescription = project?.description;

    const tasksCount = tasks?.length

    return (
        <PageContainer>
            <Title label={projectName} subTitle={projectDescription} />
            <ProjectFilters />
            <Title label='Available tasks' isLoading={isPendingTasks} badgeCount={tasksCount} />
            {tasks && <TasksTable tasks={tasks} />}
        </PageContainer>
    )
}