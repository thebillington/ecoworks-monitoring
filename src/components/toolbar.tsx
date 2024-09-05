'use client'

import { signOut } from "next-auth/react"

interface IToolbarProps {
    name: string
}

export default function ToolbarComponent(props: IToolbarProps) {
  return (
    <div className="w-full bg-gray-500 p-2">
      Welcome, {props.name}!
      <button className="float-right" onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}