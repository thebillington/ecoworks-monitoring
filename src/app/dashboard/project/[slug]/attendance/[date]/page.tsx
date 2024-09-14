
import { getUsersForProject } from "@/app/api/gsheets/integration"
import { unslug } from "@/utilities"
import TakeAttendanceComponent from "@/components/dashboard/project/attendance/take-attendance"

export default async function ProjectInformationPage( { params } : { params: { slug: string, date: string } } ) {
    const users = await getUsersForProject(params.slug)
    const date = decodeURIComponent(params.date)
    return (
        <div className="flex h-screen flex-col">
            <div className="flex flex-col self-center w-5/6 mt-8 mb-4 max-w-sm ml-4">
                <p className="text-2xl">{ unslug(params.slug) }</p>
                <p>Attendance Sheet - { date }</p>
            </div>
            <div className="flex flex-1 justify-center">
                <div className="w-5/6 h-5/6 max-w-sm">
                    <TakeAttendanceComponent projectSlug={ params.slug } date={ date } users={ JSON.stringify(users) } />
                </div>
            </div>
        </div>
    )
}