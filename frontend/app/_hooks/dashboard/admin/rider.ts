import { AdminServiceForRider } from "@/app/_services/dashboard/admin/rider"
import { useQuery } from "@tanstack/react-query"

const getAllUsers =(page:number, limit:number) => {
    return useQuery({
        queryKey:['all-users', page, limit],
        queryFn:()=> AdminServiceForRider.getAllUsers(page, limit)
    }
    )
}

export const AdminHooks = {
    getAllUsers
}