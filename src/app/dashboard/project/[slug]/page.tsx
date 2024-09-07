import { attendanceSheetExistsFor } from "@/app/api/gsheets/integration";
import { todaysDateString, unslug } from "@/app/utilities";
import NoAttendanceSheetComponent from "@/components/dashboard/no-attendance-sheet";

export default async function ProjectInformationPage( { params } : { params: { slug: string } } ) {
    const today = todaysDateString()
    if (await attendanceSheetExistsFor(params.slug, today)) {
        return unslug(params.slug)
    }
    return (
        <NoAttendanceSheetComponent projectName={unslug(params.slug)} today={today}/>
    )
}