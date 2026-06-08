"use client"

import { useCurrentUser } from "@/app/_hooks/useCurrentUser"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"
import LoadingScreen from "@/app/_components/ui/LoadingScreen"

const AdminDashboard = () => {
  const router = useRouter()

  const { data: session, isLoading } = useCurrentUser()

  useEffect(() => {
    if (!session) return

    if (
      session.data.role !== "ADMIN" &&
      session.data.role !== "SUPER_ADMIN"
    ) {
      toast.warning("You cannot enter this path")
      router.replace("/")
    }
  }, [session, router])

  if (isLoading) {
    return <LoadingScreen />
  }

  return <div>AdminDashboard</div>
}

export default AdminDashboard