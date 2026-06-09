"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import LoadingScreen from "../ui/LoadingScreen"
import { useCurrentUser } from "@/app/_hooks/useCurrentUser"

interface AdminGuardProps {
    children: ReactNode
}

const AdminGuard = ({ children }: AdminGuardProps) => {
    const router = useRouter()

    const { data: session, isLoading } = useCurrentUser()

    useEffect(() => {
        if (!session) return

        const role = session?.data?.role

        if (
            role !== "ADMIN" &&
            role !== "SUPER_ADMIN"
        ) {
            toast.warning("You are not authorized to access this page")
            router.replace("/")
        }
    }, [session, router])

    if (isLoading) {
        return <LoadingScreen />
    }

    if (
        session &&
        session.data.role !== "ADMIN" &&
        session.data.role !== "SUPER_ADMIN"
    ) {
        return null
    }

    return <>{children}</>
}

export default AdminGuard