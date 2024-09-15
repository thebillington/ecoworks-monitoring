'use client'

import { useContext } from "react"
import { RegistrationFormContext } from '@/contexts'
import { useRouter } from "next/navigation"

export default function MedicalInfoFormComponent() {

    const router = useRouter()

    const context = useContext(RegistrationFormContext)
    let user = context

    function submitMedicalInfoForm(formData: FormData) {
        user.medical_info = formData.get('medical-info') as string
        user.additional_info = formData.get('additional-info') as string

        console.log(user)

        router.push('/register/equal-opportunities')
    }

    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Medical and additional info
            </h1>
            <form className="space-y-4 md:space-y-6" action={ submitMedicalInfoForm }>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medical information (optional)</label>
                    <textarea defaultValue={ user.medical_info ?? '' } name="medical-info" id="medical-info" placeholder="Enter any important medical information here..." className="resize-none no-scrollbar h-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Additional information (optional)</label>
                    <textarea defaultValue={ user.additional_info ?? '' } name="additional-info" id="additional-info" placeholder="Enter any other important information here..." className="resize-none no-scrollbar h-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="w-full text-center">
                    <button type="button" onClick={() => router.back()} className="w-[48%] my-4 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Previous</button>
                    <button type="submit" className="w-[45%] my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Next</button>
                </div>
            </form>
        </div>
    )
}