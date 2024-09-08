'use client'

import User from "@/app/models/user";
import AttendanceCheckboxComponent from "./attendance-checkbox";

interface ITakeAttendanceProps {
    users: string
}

export default function TakeAttendanceComponent(
    props: ITakeAttendanceProps
) {
    const users: Array<User> = JSON.parse( props.users )
    let attendees: Array<string> = []

    function attendeeToggled(email: string, isSelected: boolean) {
        if (isSelected) attendees.push( email )
        else {
            const index = attendees.indexOf(email)
            if (index > -1) attendees.splice(index, 1)
        }
    }

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr key="headings">
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3 w-40 text-center">Attending</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map( ( user, i ) => 
                            <tr key={ user.email } className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    { user.name }
                                </th>
                                <td className="px-6 py-4">
                                    <div className="flex w-full items-center justify-center">
                                        <AttendanceCheckboxComponent user={ user } isChecked={ false } userSelectedCallback={ attendeeToggled } />
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}