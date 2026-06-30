import { AdminServiceForRider } from "@/app/_services/dashboard/admin/rider"
import { useMutation, useQuery } from "@tanstack/react-query"

const useGetAllUsers = (page: number, limit: number) => {
    return useQuery({
        queryKey: ['all-users', page, limit],
        queryFn: () => AdminServiceForRider.getAllUsers(page, limit)
    }
    )
}
const useblockUser = () => {
    return useMutation({
        mutationFn: (id:string) => AdminServiceForRider.blockUser(id)
    })
}
export const AdminHooks = {
    useGetAllUsers, useblockUser
}