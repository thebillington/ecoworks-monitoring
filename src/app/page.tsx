import { getServerSession } from 'next-auth/next'
import LoginComponent from '@/components/login'
import { authOptions } from "@/auth"
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  } else {
    return (
      <div className='h-screen flex items-center justify-center'>
        <LoginComponent />
      </div>
    )
  }
}