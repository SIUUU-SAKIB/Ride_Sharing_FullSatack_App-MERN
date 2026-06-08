"use client"

import { useRouter } from "next/router"
import { useCurrentUser } from "../_hooks/useCurrentUser"
import { useEffect } from "react"
import LoadingScreen from "../_components/ui/LoadingScreen"

const DashboardPage = () => {
    const { data: session, isLoading } = useCurrentUser()
    const router = useRouter()
    useEffect(() => {
        if (!session) return
        if (session?.data?.role === `ADMIN` ||
            session?.data?.role === `SUPER_ADMIN`
        ) {
            router.replace('/dashboard/admin')
        } else if (session?.data?.role === `RIDER`) {
            router.replace(`/dashboard/rider`)
        } else if (session?.data?.role === `DRIVER`) {
            router.replace(`/dashboard/driver`)
        } else if (isLoading) {
            <LoadingScreen />
        } else {
            alert(`SOMETHING WENT WRONG`)
        }
    }, [session.router])

}

export default DashboardPage