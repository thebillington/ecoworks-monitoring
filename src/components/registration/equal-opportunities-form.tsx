'use client'

import { useContext } from "react"
import { RegistrationFormContext } from "@/contexts"
import { useRouter } from "next/navigation"

export default function EqualOpportunitiesFormComponent() {

    const router = useRouter()

    const context = useContext(RegistrationFormContext)
    let user = context

    function submitEqualOpportunitiesForm(formData: FormData) {
        user.employment_details = formData.get('employment-details') as string
        user.cultural_background = formData.get('cultural-background') as string

        router.push('/register/declaration')
    }

    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Equal opportunities
            </h1>
            <div className="w-full text-center">
                <p className="text-xs">Ecoworks operates an equal opportunities policy across all of our activities. We would be grateful if you could tell us a bit more about yourself to help us monitor our efforts to achieve this.</p>
            </div>
            <form className="space-y-4 md:space-y-6" action={ submitEqualOpportunitiesForm }>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Economic activity (optional)</label>
                    <select defaultValue={ user.employment_details ?? '' } name="employment-details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value='Prefer not to say'>Prefer not to say</option>
                        <option value='Employed'>Employed (full or part time)</option>
                        <option value='Unemployed'>Unemployed</option>
                        <option value='Retired'>Retired</option>
                        <option value='Other economically inactive'>Other economically inactive</option>
                        <option value='Looking after home/family'>Looking after home/family</option>
                        <option value='A student'>A student</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cultural background (optional)</label>
                    <select defaultValue={ user.cultural_background ?? '' } name="cultural-background" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value='Prefer not to say'>Prefer not to say</option>
                        <option value='White British'>White British</option>
                        <option value='White Irish'>White Irish</option>
                        <option value='White Other'>White Other</option>
                        <option value='Black or Black British - Caribbean'>Black or Black British - Caribbean</option>
                        <option value='Black or Black British - African'>Black or Black British - African</option>
                        <option value='Black or Black British - Other'>Black or Black British - Other</option>
                        <option value='Mixed - White and Black Caribbean'>Mixed - White and Black Caribbean</option>
                        <option value='Mixed - White and Black African'>Mixed - White and Black African</option>
                        <option value='Mixed - White and Black Asian'>Mixed - White and Black Asian</option>
                        <option value='Mixed - Other'>Mixed - Other</option>
                        <option value='Asian or Asian British - Indian'>Asian or Asian British - Indian</option>
                        <option value='Asian or Asian British - Pakistani'>Asian or Asian British - Pakistani</option>
                        <option value='Asian or Asian British - Bangladeshi'>Asian or Asian British - Bangladeshi</option>
                        <option value='Asian or Asian British - Other'>Asian or Asian British - Other</option>
                    </select>
                </div>
                <div className="w-full text-center">
                    <button type="button" onClick={() => router.back()} className="w-[48%] my-4 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Previous</button>
                    <button type="submit" className="w-[45%] my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Next</button>
                </div>
            </form>
        </div>
    )
}