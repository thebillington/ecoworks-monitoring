'use client'

import { checkIfEmailRegistered, IFormResponse } from "@/app/api/gsheets/integration"
import { useFormState } from "react-dom"
import { useContext, useState } from "react"
import { RegistrationFormContext } from "@/app/register/layout"
import { useRouter } from "next/navigation"

const initialState: IFormResponse = {
    status: 0,
    message: '',
    colour: ''
}

export default function UserDetailsFormComponent() {

    const router = useRouter()

    const context = useContext(RegistrationFormContext)
    let user = context

    const [loading, setLoading] = useState(false)

    async function submitUserDetailsForm(prevState: any, formData: FormData) {

        user.email = formData.get('email') as string
        user.name = formData.get('name') as string
        user.type = formData.get('user-type') as string

        const response = await checkIfEmailRegistered(formData.get('email') as string)
        if (response.status != 200) return response

        router.push('/register/address-details')
    }

    const [state, formAction] = useFormState(submitUserDetailsForm, initialState)

    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register to use the Ecoworks space
            </h1>
            <div className="w-full text-center">
                <p className="text-orange-300">If you close the tab or refresh before finishing the registration process, any progress might be lost</p>
            </div>
            <form className="space-y-4 md:space-y-6" action={formAction}>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email *</label>
                    <input defaultValue={ user.email ?? '' } type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name *</label>
                    <input defaultValue={ user.name ?? '' } name="name" id="name" placeholder="John Doe" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Which best describes you?</label>
                    <select defaultValue={ user.type ?? '' } id="user-type" name="user-type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value='volunteer'>Volunteer</option>
                        <option value='staff'>Staff</option>
                        <option value='trustee'>Trustee</option>
                    </select>
                </div>
                <div className="w-full text-center">
                    <p className={state?.colour} aria-live="polite">{state?.message}</p>
                </div>
                <div className="w-full text-right">
                    <button type="submit" className="w-[45%] my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Next</button>
                </div>
            </form>
        </div>
    )
}