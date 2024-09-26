'use client'

import { useContext } from "react"
import { RegistrationFormContext } from "@/contexts"
import { useRouter } from "next/navigation"
import { createUser, IFormResponse } from "@/app/api/gsheets/integration"
import { useFormState } from "react-dom"
import User from "@/models/user"

const initialState: IFormResponse = {
    status: 0,
    message: '',
    colour: ''
}

export default function DeclarationFormComponent() {

    const router = useRouter()

    const context = useContext(RegistrationFormContext)
    let user = context

    async function submitDeclarationForm(prevState: any, formData: FormData) {

        const response = await createUser(JSON.stringify(user))
        if (response.status != 200) return response

        router.push('/register/success')
    }

    const [state, formAction] = useFormState(submitDeclarationForm, initialState)

    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Declaration
            </h1>
            <form className="space-y-4 md:space-y-6" action={ formAction }>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
                    <textarea value={ user.pretty() } name="medical-info" disabled className="resize-none no-scrollbar h-40 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <div className="flex w-full items-center justify-center px-2">
                        <label className="flex items-center cursor-pointer relative">
                            <input type="checkbox" required className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600" />
                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </span>
                        </label>
                        <p className="ms-2 text-xs">I have read the <a className="text-blue-600 dark:text-blue-500 hover:underline" href='/documents/health-and-safety-agreement.pdf'>health and safety</a> guidelines and agree to abide by these when on site</p>
                    </div>
                </div>
                <div className="w-full text-center">
                    <p className={state?.colour} aria-live="polite">{state?.message}</p>
                </div>
                <div className="w-full text-center">
                    <button type="button" onClick={() => router.back()} className="w-[48%] my-4 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Previous</button>
                    <button type="submit" className="w-[45%] my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Register</button>
                </div>
            </form>
        </div>
    )
}