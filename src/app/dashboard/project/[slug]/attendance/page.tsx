
import { getUsersForProject } from "@/app/api/gsheets/integration"
import { unslug } from "@/app/utilities"
import TakeAttendanceComponent from "@/components/dashboard/project/attendance/take-attendance"

export default async function ProjectInformationPage( { params } : { params: { slug: string } } ) {
    const users = await getUsersForProject(params.slug)
    return (
        <div className="flex h-screen flex-col">
            <div className="flex mt-8 mb-4 justify-center text-2xl">
                <span>{ `${unslug(params.slug)} - Attendance Sheet` }</span>
            </div>
            <div className="flex flex-1 justify-center">
                <div className="w-5/6 h-5/6 max-w-sm">
                    <TakeAttendanceComponent users={ JSON.stringify(users) } />
                </div>
            </div>
        </div>
    )
}