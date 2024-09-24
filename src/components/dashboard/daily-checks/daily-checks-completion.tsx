'use client'

import { useState } from "react"
import DailyChecksCompletionCheckboxComponent from "./daily-checks-checkbox-component"

interface DailyChecksComponentProps {
    questions: Array<string>
}

export default function DailyChecksCompletionComponent(
    props: DailyChecksComponentProps
) {
    const questions = props.questions
    const toggles = Array<boolean>(questions.length).fill(false)

    const [error, setError] = useState<string | undefined>(undefined)

    function toggleCheckbox(index: number, isSelected: boolean) {
        toggles[index] = isSelected
    }
    
    async function submitForm() {
        if (!toggles.every(t => t === true)) return setError('You must check all items!')
        else setError(undefined)
        
        // const response = await submitAttendanceSheet(
        //     props.date,
        //     props.projectSlug,
        //     attendees,
        //     comments
        // )

        // if (response && response.message != 'success') setError(response.message)
    }

    return (
        <>
            <div className="max-h-96 relative overflow-y-auto no-scrollbar my-8 rounded-md">
                <table className="h-full w-full text-sm text-left rounded-md rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr key="headings">
                            <th scope="col" className="px-6 py-3">Item</th>
                            <th scope="col" className="px-6 py-3 min-w-24 text-center">Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            questions.map( ( question, i ) => 
                                <tr key={ i } className={`bg-white ${i != questions.length - 1 ? 'border-b ' : ' '}dark:bg-gray-800 dark:border-gray-700`}>
                                    <th scope="row" className="ps-6 py-4 font-medium text-gray-900 dark:text-white">
                                        { question }
                                    </th>
                                    <td className="px-6 py-4">           
                                        <DailyChecksCompletionCheckboxComponent index={ i } isChecked={ toggles[i] } checkboxToggledCallback={ toggleCheckbox } />
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