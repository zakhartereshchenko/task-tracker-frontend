import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../components"
import { PageContainer } from "../components/layouts"
import { useHeader } from "../hooks/useHeader";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { EditTaskFormContainer } from "../components/forms";

export const TaskPage = () => {
    const navigate = useNavigate()
    const { projectId } = useParams();

    const { setBackButton } = useHeader()

    useEffect(() => {
        setBackButton(<Button onClick={() => navigate(`/projects/${projectId}`)}><ArrowBigLeft /> <span>back</span></Button>)
    }, [])

    return (
        <PageContainer>
            <Title label="Edit your task" subTitle="You can edit any field of this task" />
            <EditTaskFormContainer />
        </PageContainer>
    )
}