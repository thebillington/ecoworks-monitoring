'use server'

import { createUser } from "../api/gsheets/integration";

export default async function submitRegistrationForm(data: FormData) {
    return await createUser(
        data.get('email') as string,
        data.get('name') as string,
        data.get('user-type') as string
    );
}