import { getServerSession } from 'next-auth/next'

import LoginComponent from '@/components/login'
import { authOptions } from "@/app/auth"
import ToolbarComponent from '@/components/toolbar'

export default async function Component() {
  const session = await getServerSession(authOptions)
  if (session) {
    return (
      <>
        <ToolbarComponent />
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