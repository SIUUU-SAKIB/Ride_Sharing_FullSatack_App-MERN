import { createRideRequstService, RideRequestPayload } from "@/app/_services/rideRequest"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateRideRequest =() => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(payload:RideRequestPayload) => 
             createRideRequstService(payload),
        onSuccess:(data) => {
            console.log(`Ride requset created ${data}`)
        },
        onError:(data) => {
            console.log(`Ride request failed ${data}`)
        }
        
    })

}