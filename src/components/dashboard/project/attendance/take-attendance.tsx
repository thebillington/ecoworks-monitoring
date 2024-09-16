'use client'

import User from "@/models/user";
import AttendanceCheckboxComponent from "./attendance-checkbox";
import { useState } from "react";
import { submitAttendanceSheet } from "@/app/api/gsheets/integration";
import { debounce } from "@/utilities";

interface ITakeAttendanceProps {
    date: string,
    projectSlug: string,
    users: string
}

let attendees: Array<string> = []
let comments: string

export default function TakeAttendanceComponent(
    props: ITakeAttendanceProps
) {
    const allUsers = JSON.parse( props.users )
    const [users, setUsers] = useState<Array<User>>(allUsers)

    const [error, setError] = useState<string | undefined>(undefined)

    const debouncedUserFilter = debounce(handleSearch, 500)

    function handleSearch(term: string) {
        setUsers(allUsers.filter( (user: User) => (user?.name ?? '').toLowerCase().indexOf(term.toLowerCase()) > -1 ))
    }

    function updateComments(comment: string) {
        comments = comment
    }

    function attendeeToggled(email: string, isSelected: boolean) {
        if (isSelected) attendees.push( email )
        else {
            const index = attendees.indexOf(email)
            if (index > -1) attendees.splice(index, 1)
        }
    }
    
    async function submitForm() {
        if (attendees.length == 0) return setError('You must select at least one attendee!')
        else setError(undefined)
        
        const response = await submitAttendanceSheet(
            props.date,
            props.projectSlug,
            attendees,
            comments
        )

        if (response && response.message != 'success') setError(response.message)
    }

    return (
        <>
            <span className="ml-2">Comments</span>
            <div className="flex flex-col h-[15%] relative overflow-y-auto no-scrollbar mb-4 rounded-md">
                <textarea onChange={ (e) => updateComments(e.target.value) } className="flex-1 resize-none no-scrollbar block w-full mt-1 py-2 px-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter any additional comments..." />
            </div>
            <span className="ml-2">Take Attendance</span>
            <div className="relative mt-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" onChange={ (e) => debouncedUserFilter(e.target.value) } className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Name..." />
            </div>
            <div className="max-h-[55%] relative overflow-y-auto no-scrollbar my-2 rounded-md">
                <table className="h-full w-full table-fixed text-sm text-left rounded-md rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr key="headings">
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3 w-40 text-center">Attending</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map( ( user, i ) => 
                                <tr key={ user.email } className={`bg-white ${i != users.length - 1 ? 'border-b ' : ' '}dark:bg-gray-800 dark:border-gray-700`}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        { user.name }
                                    </th>
                                    <td className="px-6 py-4">
                                        <AttendanceCheckboxComponent user={ user } isChecked={ false } userSelectedCallback={ attendeeToggled } />
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col w-full text-center">
                <p className="mt-2 text-red-300" aria-live="polite">{error}</p>
                <button onClick={ submitForm } className="w-full mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
            </div>
        </>
    )
}