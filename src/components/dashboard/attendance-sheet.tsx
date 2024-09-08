import { getUsersFromAttendanceSheet } from "@/app/api/gsheets/integration";
import AttendanceSheet from "@/app/models/attendance-sheet";

interface IAttendanceSheetProps {
    attendanceSheet: AttendanceSheet
}

export default async function AttendanceSheetComponent(
    props: IAttendanceSheetProps
) {
    const attendees = await getUsersFromAttendanceSheet(props.attendanceSheet)
    return (
        <>
            <span className="ml-2">Comments</span>
            <div className="flex flex-col h-[15%] relative overflow-x-auto overflow-y-auto no-scrollbar mb-4 rounded-md">
                <textarea disabled value={ props.attendanceSheet.comments } className="flex-1 resize-none no-scrollbar block w-full mt-1 py-2 px-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter any additional comments..." />
            </div>
            <span className="ml-2">Attendees</span>
            <div className="max-h-[55%] relative overflow-y-auto no-scrollbar my-2 rounded-md">
                <table className="h-full w-full table-fixed text-sm text-left rounded-md rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr key="headings">
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3 hidden sm:table-cell">Medical Info</th>
                            <th scope="col" className="px-6 py-3 hidden lg:table-cell">Additional Info</th>
                            <th scope="col" className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendees.map( ( user, i ) => 
                                <tr key={ user.name } className={`bg-white ${i != attendees.length - 1 ? 'border-b ' : ' '}dark:bg-gray-800 dark:border-gray-700`}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        { user.name }
                                    </th>
                                    <td className="px-6 py-4 hidden sm:table-cell">
                                        <div className="flex w-full">
                                            { user.medical_info }
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden lg:table-cell">
                                        <div className="flex w-full">
                                            { user.additional_info }
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex w-full justify-center">
                                            <button data-dropdown-toggle={ `${ user.email }-dropdown`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                                View Info
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col w-full text-center mt-6">
                <button className="w-full mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button>
            </div>
        </>
    )
}