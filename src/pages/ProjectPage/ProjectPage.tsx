import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PageContainer } from "../../components/layouts"
import { useGetProject } from "../../hooks/useProjects/useGetProject";
import { TasksGridView, TasksTable, Title } from "../../components";
import { useHeader } from "../../hooks/useHeader";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import { ArrowBigLeft, Columns3, List } from "lucide-react";
import { useGetTasks, type IFilters } from "../../hooks/useTasks/useGetTasks";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ProjectFilters } from "./filters/ProjectFilters";
import type { TViewMode } from "../../types/ui";

export const ProjectPage = () => {
    const navigate = useNavigate()
    const { projectId } = useParams();
    const { setBackButton } = useHeader()
    const [searchParams] = useSearchParams();

    const [viewMode, setViewMode] = useState<TViewMode>('kanban')

    const labelsQuery = searchParams.get("labels") ?? undefined;
    const statusQuery = searchParams.get("status") ?? undefined;
    const priorityQuery = searchParams.get("priority") ?? undefined;
    const titleQuery = searchParams.get("search") ?? undefined;

    useEffect(()=>{
        setBackButton(<Button onClick={()=>navigate("/projects")}><ArrowBigLeft /><span>back</span></Button>)
    },[])

    const {data: project, isPending} = useGetProject(projectId)

    const filters: IFilters = useMemo(()=>{
        return {
            labelsQuery, 
            statusQuery: viewMode === 'table' ? statusQuery : undefined, 
            priorityQuery, 
            titleQuery
        }
    },[viewMode, labelsQuery, statusQuery, priorityQuery, titleQuery])

    const {data: tasks, isPending: isPendingTasks} = useGetTasks({projectId, filters})

    const projectName = useMemo(() => project?.name, [project]);

    const projectDescription = useMemo(() => project?.description, [project]);

    const tasksCount = useMemo(() => tasks?.length, [tasks]);

    return (
        <PageContainer>
            <Title label={projectName} subTitle={projectDescription} isLoading={isPending} />
            <ProjectFilters viewMode={viewMode} />
            <div className="flex flex-row justify-between">
                <Title label='Available tasks' isLoading={isPendingTasks} badgeCount={tasksCount} />
                <Tabs value={viewMode}>
                    <TabsList>
                        <TabsTrigger value="table" onClick={()=>setViewMode('table')}>
                            <List />
                            {/* Table view */}
                        </TabsTrigger>
                        <TabsTrigger value="kanban" onClick={()=>setViewMode('kanban')}>
                            <Columns3 />
                            {/* Kanban view */}
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            {tasks && 
                (viewMode === 'table' ? <TasksTable tasks={tasks} /> : <TasksGridView tasks={tasks} />)
            }
        </PageContainer>
    )
}