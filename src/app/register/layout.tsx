'use client'

import User from '@/models/user'
import { useState } from 'react'
import { RegistrationFormContext } from "@/contexts"

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {
    const [user, _] = useState<User>(new User())

    return (
        <RegistrationFormContext.Provider value={ user }>
          <div className="flex items-center justify-center mx-auto h-dvh lg:py-0 bg-white md:dark:bg-black dark:bg-gray-800">
            <div className="w-full bg-white md:rounded-lg border-none light:border-none md:dark:border-solid md:dark:border md:mt-0 sm:max-w-md max-w-sm xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              {children}
            </div>
          </div>
        </RegistrationFormContext.Provider>
    )
  }
  