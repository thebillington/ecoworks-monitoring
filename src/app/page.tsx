import { getServerSession } from 'next-auth/next'

import LoginComponent from '@/components/login'
import { authOptions } from "@/app/auth"
import ToolbarComponent from '@/components/toolbar'
import { getUsers } from './api/gsheets/integration'

export default async function Component() {
  const session = await getServerSession(authOptions)
  const users = await getUsers()

  if (session) {
    return (
      <>
        <ToolbarComponent name={session.user?.name ?? '{name}'} />
      </>
    )
  } else {
    return (
      <div className='h-screen flex items-center justify-center'>
        <LoginComponent />
      </div>
    )
  }
}