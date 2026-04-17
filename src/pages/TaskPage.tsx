import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../components"
import { PageContainer } from "../components/layouts"
import { useHeader } from "../hooks/useHeader";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { useGetTask } from "../hooks/useTasks/useGetTask";
import { EditTaskForm } from "../components/forms";

export const TaskPage = () => {
    const navigate = useNavigate()
    const { projectId, taskId } = useParams();

    const { setBackButton } = useHeader()
    
    useEffect(()=>{
        setBackButton(<Button onClick={()=>navigate(`/projects/${projectId}`)}><ArrowBigLeft /> <span>back</span></Button>)
    },[])

    if (!projectId || !taskId) {
        return <div>Invalid route</div>
    }

    const {data: task, isPending} = useGetTask({projectId, taskId})

    return (
        <PageContainer>
            <Title label="Edit your task" subTitle="You can edit any field of this task" />
            <EditTaskForm />
        </PageContainer>
    )
}