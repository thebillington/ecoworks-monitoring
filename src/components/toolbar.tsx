'use client'

import { signOut } from "next-auth/react"

interface IToolbarProps {
    name: string
}

export default function ToolbarComponent(props: IToolbarProps) {
  return (
    <div className="w-full px-2">
      Welcome, {props.name}!
      <button className="float-right" onClick={() => signOut({ callbackUrl: '/', redirect:true })}>Sign Out</button>
    </div>
  )
}