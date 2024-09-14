import { getUsersFromAttendanceSheet } from "@/app/api/gsheets/integration";
import AttendanceSheet from "@/models/attendance-sheet";

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
                <table className="h-full w-full text-sm text-left rounded-md rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr key="headings">
                            <th scope="col" className="px-6 py-3">Details</th>
                            <th scope="col" className="px-6 py-3">Medical Info</th>
                            <th scope="col" className="px-6 py-3">Additional Info</th>
                            <th scope="col" className="px-6 py-3">Emergency Contact</th>
                            <th scope="col" className="px-6 py-3">Support Worker</th>
                            <th scope="col" className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendees.map( ( user, i ) => 
                                <tr key={ user.name } className={`bg-white ${i != attendees.length - 1 ? 'border-b ' : ' '}dark:bg-gray-800 dark:border-gray-700`}>
                                    <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <p className="font-medium">{ user.name }</p>
                                        <p className="font-light"><a href={ `tel:${ user.phone }` }>{ user.phone }</a></p>
                                        <p className="font-light"><a href={ `mailto:${ user.email }` }>{ user.email }</a></p>
                                    </th>
                                    <td className="px-6 py-4 min-w-72">
                                        { user.medical_info }
                                    </td>
                                    <td className="px-6 py-4 min-w-72">
                                        { user.additional_info }
                                    </td>
                                    <td className="px-6 py-4 min-w-72">
                                        { `${ user.emergency_name}, Relationship: ${user.emergency_relation}` }
                                    </td>
                                    <td className="px-6 py-4 min-w-72">
                                    { `${ user.support_name}, Organisation: ${user.support_organisation}` }
                                    </td>
                                    <td className="grid grid-cols-2 gap-2 text-center px-6 py-4 min-w-96">
                                        <a href={ `tel:${ user.emergency_phone }` }>
                                            <button className="col text-xs m1 min-w-36 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center" type="button">
                                                Call Emergency
                                            </button>
                                        </a>
                                        <a href={ `mailto:${ user.emergency_email }` }>
                                            <button className="col text-xs m1 min-w-36 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center" type="button">
                                                Email Emergency
                                            </button>
                                        </a>
                                        <a href={ `tel:${ user.support_phone }` }>
                                            <button className="col text-xs m1 min-w-36 text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center" type="button">
                                                Call Support
                                            </button>
                                        </a>
                                        <a href={ `tel:${ user.support_email }` }>
                                            <button className="col text-xs m1 min-w-36 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center" type="button">
                                                Email Support
                                            </button>
                                        </a>
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
            <dialog id="user-details" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click outside to close</p>
                </div>
            </dialog>
        </>
    )
}