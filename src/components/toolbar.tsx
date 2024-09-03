'use client'

import { signOut } from "next-auth/react"

interface IToolbarProps {
    name: string
}

export default function ToolbarComponent(props: IToolbarProps) {
  return (
    <>
      <p>Welcome, {props.name}!</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  )
}