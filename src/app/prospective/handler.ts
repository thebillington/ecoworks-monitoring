'use server'

import { createProspective } from "../api/gsheets/integration"

export default async function submitProspectiveForm(prevState: any, formData: FormData) {
    return await createProspective(
        formData.get('email') as string,
        formData.get('name') as string
    )
}