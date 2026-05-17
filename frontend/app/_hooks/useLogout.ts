import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Authentication } from "../_services/auth"
import { toast } from "sonner"

export const useLogout = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: Authentication.logoutUser,
        onSuccess: async () => {
            toast.success('Logout Successfull')
            router.push(`/login`)
        },
        onError: (error) => {
            toast.error(
                error instanceof Error ? error.message : "Logout Failed"
            )
        }
    })
}