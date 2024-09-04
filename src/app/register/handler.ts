'use server'

import { createUser } from "../api/gsheets/integration"

export default async function submitRegistrationForm(prevState: any, formData: FormData) {
    return await createUser(
        formData.get('email') as string,
        formData.get('name') as string,
        formData.get('user-type') as string
    )
}