'use client'

import { useContext } from "react"
import { RegistrationFormContext } from "@/app/register/layout"
import { useRouter } from "next/navigation"

export default function AddressDetailsFormComponent() {

    const router = useRouter()

    const context = useContext(RegistrationFormContext)
    let user = context

    function submitAddressDetailsForm(formData: FormData) {
        user.addr = formData.get('addr') as string
        user.postcode = formData.get('postcode') as string
        user.phone = formData.get('phone') as string

        router.push('/register/emergency-details')
    }

    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Emergency contact details
            </h1>
            <form className="space-y-4 md:space-y-6" action={ submitAddressDetailsForm }>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address *</label>
                    <input defaultValue={ user.addr ?? '' } name="addr" id="addr" placeholder="Ecoworks, 121 Ransom Road, Nottingham" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Postcode *</label>
                    <input
                        defaultValue={ user.postcode ?? '' }
                        type="text"
                        name="postcode"
                        id="postcode"
                        placeholder="NG3 3LH"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={ e => ((e.target) as HTMLInputElement).setCustomValidity('')}
                        onInvalid={ e => ((e.target) as HTMLInputElement).setCustomValidity('Please enter a valid postcode')}
                        required pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone number *</label>
                    <input defaultValue={ user.phone ?? '' } type="tel" name="phone" id="phone" placeholder="07712345678" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="w-full text-center">
                    <button type="button" onClick={() => router.back()} className="w-[48%] my-4 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Previous</button>
                    <button type="submit" className="w-[45%] my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Next</button>
                </div>
            </form>
        </div>
    )
}