import AdminGuard from "@/app/_components/utils/AdminGuard"
import Sidebar from "./_components/Sidebar"


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen flex bg-zinc-100 justify-center">
        <Sidebar/>
        {children}
      </div>

    </AdminGuard>
  )
}