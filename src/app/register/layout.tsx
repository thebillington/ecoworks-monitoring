'use client'

import User from '@/models/user'
import { createContext, useState } from 'react'

export const RegistrationFormContext = createContext<User>( new User() )

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {
    const [user, _] = useState<User>(new User())

    return (
        <RegistrationFormContext.Provider value={ user }>
            {children}
        </RegistrationFormContext.Provider>
    )
  }
  