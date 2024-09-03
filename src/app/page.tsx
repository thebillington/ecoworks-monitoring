import { getServerSession } from 'next-auth/next'

import LoginComponent from '@/components/login'
import { authOptions } from "@/app/auth"
import ToolbarComponent from '@/components/toolbar'
import { getGoogleSheetsData } from './api/gsheets/integration'

export default async function Component() {
  const session = await getServerSession(authOptions)
  console.log(await getGoogleSheetsData('test!A1:B1'))
  if (session) {
    return (
      <>
        <ToolbarComponent name={session.user.name ?? '{name}'} />
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