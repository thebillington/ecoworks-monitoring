import { getPreviousAttendeeEmails, getUsers } from "@/app/api/gsheets/integration"
import { unslug } from "@/app/utilities"
import TakeAttendanceComponent from "@/components/dashboard/project/take-attendance"

export default async function ProjectInformationPage( { params } : { params: { slug: string } } ) {
    const users = await getUsers()
    const previousAttendess = await getPreviousAttendeeEmails(params.slug)
    return (
        <>
            <div className="my-2 text-center text-2xl">
                { `${unslug(params.slug)} - Attendance Sheet` }
            </div>
            <TakeAttendanceComponent users={ users } />
        </>
    )
}