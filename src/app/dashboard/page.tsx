import ProjectSelectorComponent from "@/components/dashboard/project-selector";
import { getProjects } from "../api/gsheets/integration";
import { DailyChecksComponent } from "@/components/dashboard/daily-checks-selector";

export default async function DashboardPage() {
    const projects = await getProjects()
    const dailyChecks = [
        { checkName: 'Opening Checks', isComplete: true },
        { checkName: 'Closing Checks', isComplete: false },
        { checkName: 'Closing Checks', isComplete: false },
        { checkName: 'Closing Checks', isComplete: false }
    ]
    return (
        <>
            <div className="flex w-full overflow-auto items-center justify-center lg:gap-x-4 flex-col md:items-start md:flex-row">
                <ProjectSelectorComponent projects={projects} />
                <DailyChecksComponent checks={ dailyChecks }/>
            </div>
        </>
    )
}