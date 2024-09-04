import { NextRequest, NextResponse } from "next/server"
import { createUser } from "../integration"

export async function POST( request: NextRequest ) {
    const data = await request.json()

    return await createUser(
        data['email'],
        data['name'],
        data['user-type']
    )
}