import { getServerSession } from 'next-auth/next'

import LoginComponent from '@/components/login'
import { authOptions } from "@/app/auth"

export default async function Component() {
  const session = await getServerSession(authOptions)
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
      </>
    )
  } else {
    return <LoginComponent />
  }
}