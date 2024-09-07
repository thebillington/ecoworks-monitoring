import ProjectSelectorComponent from "@/components/dashboard/project-selector";
import { getProjects } from "../api/gsheets/integration";

export default async function DashboardPage() {
    const projects = await getProjects()
    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            <ProjectSelectorComponent projects={projects} />
        </div>
    )
}