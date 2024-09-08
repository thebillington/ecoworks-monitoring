'use client'

import { IProspectiveFormResponse } from "@/app/api/gsheets/integration"
import submitProspectiveForm from "@/app/prospective/handler"
import { useFormState } from "react-dom"

const initialState: IProspectiveFormResponse = {
    message: '',
    colour: ''
}

export default function ProspectiveFormComponent() {

    const [state, formAction] = useFormState(submitProspectiveForm, initialState)

    return (
        <div className="flex flex-col items-center justify-center mx-auto h-dvh lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Register interest in Ecoworks and we'll get back to you soon!
                    </h1>
                    <form className="space-y-4 md:space-y-6" action={formAction}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input name="name" id="name" placeholder="John Doe" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="w-full text-center">
                            <p className={state?.colour} aria-live="polite">{state?.message}</p>
                        </div>
                        <div className="w-full text-center">
                            <button type="submit" className="w-5/6 my-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}