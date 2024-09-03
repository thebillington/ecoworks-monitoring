'use client'

import { signOut } from "next-auth/react"

export default function ToolbarComponent() {
  return (
    <>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  )
}