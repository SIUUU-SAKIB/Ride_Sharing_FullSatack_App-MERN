"use client"

import { useCurrentUser } from "@/app/_hooks/useCurrentUser"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"
import LoadingScreen from "@/app/_components/ui/LoadingScreen"
import Overview from "./_components/dashboard/Overview"
import RecentReg from "./_components/dashboard/RecentReg"
import PlatformAlerts from "./_components/dashboard/PlatformAlerts"
import RideActivity from "./_components/dashboard/RideActivity"

const AdminLayout = () => {
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
  return <div className='pt-12 px-12 mx-auto'>
    {/* TOP CONTENT */}
    <div className='flex items-center justify-between'>
      <div className='flex flex-col'>
        <p className='text-2xl font-semibold'>Platform Overview</p>
        <p className='text-md text-(--neutral)'>Real-time metrics and critical tasks for today</p>
      </div>
      <div className='flex gap-1 items-center'>
        <div className='w-2 h-2 bg-green-500 rounded-full'></div>
        <p className='text-md text-(--neutral)'>Live Data</p>
      </div>
    </div>
    {/* OVERVIEW */}
    <Overview />
    {/* RECENT REGISTRATIONS AND SUSPITION PART */}
    <div className="grid grid-cols-3 pt-4 items-center gap-4 w-full">
     <RecentReg/>
     <RideActivity/>
    </div>
  </div>
}

export default AdminLayout


