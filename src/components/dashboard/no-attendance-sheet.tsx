'use client'

import { usePathname } from "next/navigation"

interface INoAttendanceSheetProps {
    projectName: string
    today: string
}

export default function NoAttendanceSheetComponent(props: INoAttendanceSheetProps) {
    const pathname = usePathname()
    return (
        <div className='h-full flex items-center justify-center'>   
            <div className='block text-center max-w-xs'>
                <p>There is no { props.projectName } attendance sheet for { props.today }</p>
                <a href={`${pathname}/attendance`}>
                    <button className="w-4/6 my-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Take Register</button>
                </a>
            </div>
        </div>
    )
}