import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "../components/layouts"
import { useGetProject } from "../hooks/useProjects/useGetProject";
import { Title } from "../components";
import { ProjectFilters } from "../components/ProjectFilters";
import { useHeader } from "../hooks/useHeader";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { ArrowBigLeft } from "lucide-react";

export const ProjectPage = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const { setBackButton } = useHeader()

    useEffect(()=>{
        setBackButton(<Button onClick={()=>navigate("/projects")}><ArrowBigLeft /> <span>back</span></Button>)
    },[])

    const {data: project, isPending} = useGetProject(id)

    const projectName = project?.name;
    const projectDescription = project?.description;

    return (
        <PageContainer>
            <Title label={projectName} subTitle={projectDescription} />
            <ProjectFilters />
            <div>Tasks list</div>
        </PageContainer>
    )
}