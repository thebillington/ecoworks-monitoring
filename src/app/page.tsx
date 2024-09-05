import { getServerSession } from 'next-auth/next'

import LoginComponent from '@/components/login'
import { authOptions } from "@/app/auth"
import ToolbarComponent from '@/components/toolbar'
import { getProjects, getUsers } from './api/gsheets/integration'
import ProjectSelectorComponent from '@/components/dashboard/project-selector'

export default async function Component() {
  const session = await getServerSession(authOptions)
  const projects = await getProjects()

  if (session) {
    return (
      <>
        <ToolbarComponent name={session.user?.name ?? '{name}'} />
        <div className="grid grid-cols-4 gap-4 p-4">
          <ProjectSelectorComponent projects={projects} />
        </div>
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