import { AdminServiceForDriver } from "@/app/_services/dashboard/admin/driver"
import { useQuery } from "@tanstack/react-query"

const useAllApplications = (page:number, limit:number, search:string,status:string) => {
   return useQuery({
        queryKey:[`all-aplications`, page, limit, search, status],
        queryFn:() => AdminServiceForDriver.allApplications(page, limit, search, status)
    })
}

const useGetApplicationById = (driver_id:string) => {
    return useQuery({
        queryKey:[`get-application-by-id`, driver_id],
        queryFn:() => AdminServiceForDriver.getApplicationById(driver_id)
    })
}
export const AdminHooksForDriver = {
    useAllApplications,
    useGetApplicationById
}