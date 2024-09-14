'use client'

import { useContext } from "react"
import { RegistrationFormContext } from "@/app/register/layout"
import { useRouter } from "next/navigation"

export default function SupportDetailsFormComponent() {

    const router = useRouter()

    const context = useContext(RegistrationFormContext)
    let user = context

    function submitSupportDetailsForm(formData: FormData) {
        user.support_name = formData.get('support-name') as string
        user.support_organisation = formData.get('support-organisation') as string
        user.support_email = formData.get('support-email') as string
        user.support_phone = formData.get('support-phone') as string

        router.push('/register/medical-info')
    }

    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Support worker details
            </h1>
            <form className="space-y-4 md:space-y-6" action={ submitSupportDetailsForm }>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name (optional)</label>
                    <input defaultValue={ user.support_name ?? '' } name="support-name" id="support-name" placeholder="John Doe" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organisation (optional)</label>
                    <input defaultValue={ user.support_organisation ?? '' } name="support-organisation" id="support-organisation" placeholder="Improving Lives Notts" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email (optional)</label>
                    <input defaultValue={ user.support_email ?? '' } type="email" name="support-email" id="support-email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telephone number (optional)</label>
                    <input defaultValue={ user.support_phone ?? '' } type="tel" name="support-phone" id="support-phone" placeholder="07712345678" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="w-full text-center">
                    <button type="button" onClick={() => router.back()} className="w-[48%] my-4 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Previous</button>
                    <button type="submit" className="w-[45%] my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Next</button>
                </div>
            </form>
        </div>
    )
}