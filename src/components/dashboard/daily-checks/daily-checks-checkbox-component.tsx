import { ChangeEvent, useState } from "react"

interface DailyChecksCompletionCheckboxProps {
    index: number
    isChecked: boolean
    checkboxToggledCallback: (index: number, isChecked: boolean) => void
}

export default function DailyChecksCompletionCheckboxComponent( props: DailyChecksCompletionCheckboxProps) {
    const [checked, setChecked] = useState(props.isChecked)

    function toggleAttendance( index: number, isChecked: boolean ) {
        props.checkboxToggledCallback(index, isChecked)
        setChecked(!checked)
    }

    return (
        <div className="flex w-full items-center justify-center">
            <label className="flex items-center cursor-pointer relative">
                <input type="checkbox" checked={checked} onChange={ (e) => toggleAttendance(props.index, e.target.checked) } className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600" />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                </span>
            </label>
        </div>
    )
}