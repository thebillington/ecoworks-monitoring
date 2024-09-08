'use client'

import User from "@/app/models/user";
import AttendanceCheckboxComponent from "./attendance-checkbox";
import { useState } from "react";

interface ITakeAttendanceProps {
    users: string
}

export default function TakeAttendanceComponent(
    props: ITakeAttendanceProps
) {
    const allUsers = JSON.parse( props.users )
    const [users, setUsers] = useState<Array<User>>(allUsers)
    let attendees: Array<string> = []

    function handleSearch(term: string) {
        setUsers(allUsers.filter( (user: User) => user.name.toLowerCase().indexOf(term.toLowerCase()) > -1 ))
    }

    function attendeeToggled(email: string, isSelected: boolean) {
        if (isSelected) attendees.push( email )
        else {
            const index = attendees.indexOf(email)
            if (index > -1) attendees.splice(index, 1)
        }
    }

    return (
        <>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" onChange={ (e) => handleSearch(e.target.value) } id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Name..." />
            </div>
            <div className="h-full relative overflow-y-auto no-scrollbar my-2 rounded-md">
                <table className="h-full w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
        </>
    )
}