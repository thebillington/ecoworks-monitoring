'use client'

import { useContext } from "react"
import { RegistrationFormContext } from '@/contexts'
import { useRouter } from "next/navigation"

export default function EmergencyDetailsFormComponent() {

    const router = useRouter()

    const context = useContext(RegistrationFormContext)
    let user = context

    function submitEmergencyDetailsForm(formData: FormData) {
        user.emergency_name = formData.get('emergency-name') as string
        user.emergency_relation = formData.get('emergency-relation') as string
        user.emergency_email = formData.get('emergency-email') as string
        user.emergency_phone = formData.get('emergency-phone') as string

        router.push('/register/support-details')
    }

    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Emergency contact details
            </h1>
            <form className="space-y-4 md:space-y-6" action={ submitEmergencyDetailsForm }>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Emergency contact name *</label>
                    <input defaultValue={ user.emergency_name ?? '' } name="emergency-name" id="emergency-name" placeholder="John Doe" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Relationship to you *</label>
                    <input defaultValue={ user.emergency_relation ?? '' } name="emergency-relation" id="emergency-relation" placeholder="e.g. Partner/Parent/Sibling/Neighbour" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Emergency contact email *</label>
                    <input defaultValue={ user.emergency_email ?? '' } type="email" name="emergency-email" id="emergency-email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Emergency contact number *</label>
                    <input defaultValue={ user.emergency_phone ?? '' } type="tel" name="emergency-phone" id="emergency-phone" placeholder="07712345678" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="w-full text-center">
                    <button type="button" onClick={() => router.back()} className="w-[48%] my-4 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Previous</button>
                    <button type="submit" className="w-[45%] my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Next</button>
                </div>
            </form>
        </div>
    )
}