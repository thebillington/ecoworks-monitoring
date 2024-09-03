'use client'

import { signIn } from "next-auth/react"

export default function LoginComponent() {
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}