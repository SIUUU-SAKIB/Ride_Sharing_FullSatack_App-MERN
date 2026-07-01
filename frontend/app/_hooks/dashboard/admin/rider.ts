import { AdminServiceForRider } from "@/app/_services/dashboard/admin/rider"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"



const useGetAllUsers = (page: number, limit: number) => {
    return useQuery({
        queryKey: ['all-users', page, limit],
        queryFn: () => AdminServiceForRider.getAllUsers(page, limit)
    }
    )
}
const useGetSingleUser = (id:string) => {
    return useQuery({
        queryKey:['get-single-user', id],
        queryFn: () => AdminServiceForRider.getSingleUser(id),
        enabled: !!id
    }
    )
}
const useblockUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id:string) => AdminServiceForRider.blockUser(id),
        onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey:['all-users']
            })
        },
    })
}

const useUnblockUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id:string) => AdminServiceForRider.unblockUser(id),
         onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey:['all-users']
            })
        },
    })
}
export const AdminHooks = {
    useGetAllUsers, useblockUser, useUnblockUser, useGetSingleUser
}