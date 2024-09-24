import ProjectSelectorComponent from "@/components/dashboard/project-selector"
import { getChecklistsForDate, getProjects } from "../api/gsheets/integration"
import { DailyChecksComponent } from "@/components/dashboard/daily-checks-selector"
import { todaysDateString } from "@/utilities"

export default async function DashboardPage() {
    const projects = await getProjects()
    const dailyChecks = await getChecklistsForDate(todaysDateString())
    return (
        <div className="flex w-full overflow-auto items-center justify-center lg:gap-x-4 flex-col md:items-start md:flex-row">
            <ProjectSelectorComponent projects={projects} />
            <DailyChecksComponent checks={ dailyChecks }/>
        </div>
    )
}