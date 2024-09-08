import { attendanceSheetExistsFor, getAttendanceSheet } from "@/app/api/gsheets/integration";
import { todaysDateString, unslug } from "@/app/utilities";
import AttendanceSheetComponent from "@/components/dashboard/attendance-sheet";
import NoAttendanceSheetComponent from "@/components/dashboard/no-attendance-sheet";

export default async function ProjectInformationPage( { params } : { params: { slug: string } } ) {
    const date = todaysDateString()
    if (await attendanceSheetExistsFor(params.slug, date)) {
        const attendanceSheet = await getAttendanceSheet(params.slug, date)
        return (
            <div className="flex h-screen flex-col">
                <div className="flex flex-col self-center w-5/6 mt-8 mb-4 max-w-4xl ml-4">
                    <p className="text-2xl">{ unslug(params.slug) }</p>
                    <p>Attendance Sheet - { date }</p>
                </div>
                <div className="flex flex-1 justify-center">
                    <div className="w-5/6 h-5/6 max-w-4xl">
                        <AttendanceSheetComponent attendanceSheet={ attendanceSheet } />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <NoAttendanceSheetComponent projectName={ unslug(params.slug) } date={ date }/>
    )
}