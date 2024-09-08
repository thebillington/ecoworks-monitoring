import ToolbarComponent from "@/components/toolbar"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex bg-gray-500 px-2 py-2 items-center">
        <ToolbarComponent name={session?.user?.name ?? '{name}'} />
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
