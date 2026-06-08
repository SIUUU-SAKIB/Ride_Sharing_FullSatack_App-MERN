"use client"

import { useRouter } from "next/navigation"
import { useCurrentUser } from "../_hooks/useCurrentUser"
import { useEffect } from "react"
import LoadingScreen from "../_components/ui/LoadingScreen"

const DashboardPage = () => {
    const router = useRouter()
    const { data: session, isLoading } = useCurrentUser()
    if (isLoading) {
        return <LoadingScreen />
    }
    useEffect(() => {

        if (!session) return
        if (
            session?.data?.role === "ADMIN" ||
            session?.data?.role === "SUPER_ADMIN"
        ) {
            router.replace("/dashboard/admin")
        } else if (session?.data?.role === "RIDER") {
            router.replace("/dashboard/rider")
        } else if (session?.data?.role === "DRIVER") {
            router.replace("/dashboard/driver")
        }
    }, [session, router])
    return null
}
export default DashboardPage