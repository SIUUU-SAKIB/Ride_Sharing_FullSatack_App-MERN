import AdminGuard from "@/app/_components/utils/AdminGuard"


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGuard>
        <p>sidebar</p>
      {children}
      <p>bottom nav</p>
    </AdminGuard>
  )
}