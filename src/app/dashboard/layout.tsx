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
    <div className="flex flex-col">
      <div className="flex bg-gray-500 px-2 h-[40px] items-center">
        <ToolbarComponent name={session?.user?.name ?? '{name}'} />
      </div>
      <div className="h-[calc(100vh-40px)]">
        {children}
      </div>
    </div>
  )
}
