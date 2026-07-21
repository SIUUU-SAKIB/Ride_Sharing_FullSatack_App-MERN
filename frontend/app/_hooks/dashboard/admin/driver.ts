import { AdminServiceForApplications } from "@/app/_services/dashboard/admin/application"
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const useAllApplications = (page:number, limit:number, search:string,status:string) => {
   return useQuery({
        queryKey:[`all-aplications`, page, limit, search, status],
        queryFn:() => AdminServiceForApplications.allApplications(page, limit, search, status)
    })
}

const useGetApplicationById = (driver_id:string) => {
    return useQuery({
        queryKey:[`get-application-by-id`, driver_id],
        queryFn:() => AdminServiceForApplications.getApplicationById(driver_id)
    })
}

const useApproveApplication = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(applicationID:string) => AdminServiceForApplications.approveApplication(applicationID),
        onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey:['get-application-by-id']
            })
        }
    })
}
const useRejectApplication = () => {
    const queryClient = useQueryClient()
    return useMutation({
     mutationFn:(applicationID:string) =>AdminServiceForApplications.rejectApplication(applicationID),
     onSuccess:()=>{
        queryClient.invalidateQueries({
            queryKey:['get-application-by-id']
        })
     }

    }
    )
}
export const AdminHooksForDriver = {
    useAllApplications,
    useGetApplicationById,
    useApproveApplication,
    useRejectApplication
}