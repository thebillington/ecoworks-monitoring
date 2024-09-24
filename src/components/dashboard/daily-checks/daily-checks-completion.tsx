'use client'

import { submitChecklistForDate } from "@/app/api/gsheets/integration"
import { todaysDateString } from "@/utilities"
import { useState } from "react"

interface DailyChecksComponentProps {
    checklistSlug: string
    questions: Array<string>
}

export default function DailyChecksCompletionComponent(
    props: DailyChecksComponentProps
) {
    const questions = props.questions
    const [toggles, setToggles] = useState(Array<boolean>(questions.length).fill(false))

    const [error, setError] = useState<string | undefined>(undefined)

    function toggleCheckbox(index: number, isSelected: boolean) {
        setToggles(
            toggles.map( (t, i) => {
                return (i == index) ? isSelected : t
            } )
        )
    }

    function toggleAll(isChecked: boolean) {
        setToggles(Array<boolean>(questions.length).fill(isChecked))
    }
    
    async function submitForm() {
        if (!toggles.every(t => t === true)) return setError('You must check all items!')
        else setError(undefined)
        
        const response = await submitChecklistForDate(
            props.checklistSlug,
            todaysDateString(),
            props.questions.length
        )

        if (response && response.message != 'success') setError(response.message)
    }

    return (
        <>
            <div className="max-h-96 relative overflow-y-auto no-scrollbar mb-8 rounded-md">
                <table className="h-full w-full text-sm text-left rounded-md rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr key="headings">
                            <th scope="col" className="px-6 py-3">Item</th>
                            <th scope="col" className="px-6 py-3 min-w-24 text-center">
                                <div className="flex w-full items-center justify-center">
                                    <label className="flex items-center cursor-pointer relative">
                                        <input type="checkbox" checked={ toggles.every(t => t === true) } onChange={ (e) => toggleAll(e.target.checked) } className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600" />
                                        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </span>
                                    </label>
                                </div>
                            </th>
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
                                        <div className="flex w-full items-center justify-center">
                                            <label className="flex items-center cursor-pointer relative">
                                                <input type="checkbox" checked={ toggles[i] } onChange={ (e) => toggleCheckbox(i, e.target.checked) } className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600" />
                                                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                    </svg>
                                                </span>
                                            </label>
                                        </div>
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