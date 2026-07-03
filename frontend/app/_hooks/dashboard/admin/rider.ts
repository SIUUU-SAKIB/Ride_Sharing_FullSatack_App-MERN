import { AdminServiceForRider } from "@/app/_services/dashboard/admin/rider"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const useGetAllUsers = (page: number, limit: number, search: string, status:string) => {
    return useQuery({
        queryKey: ['all-users', page, limit, search, status],
        queryFn: () => AdminServiceForRider.getAllUsers(page, limit, search, status)
    }
    )
}
const useGetSingleUser = (id: string) => {
    return useQuery({
        queryKey: ['get-single-user', id],
        queryFn: () => AdminServiceForRider.getSingleUser(id),
        enabled: !!id
    }
    )
}
const useblockUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => AdminServiceForRider.blockUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['all-users']
            })
        },
    })
}

const useUnblockUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => AdminServiceForRider.unblockUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['all-users']
            })
        },
    })
}
const useDeleteUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => AdminServiceForRider.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['all-users']
            })
        }
    }

    )
}
export const AdminHooks = {
    useGetAllUsers,
    useblockUser,
    useUnblockUser,
    useGetSingleUser,
    useDeleteUser
}