import { createRideRequstService, RideRequestPayload } from "@/app/_services/rideRequest"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateRideRequest =() => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(payload:RideRequestPayload) => 
             createRideRequstService(payload)
        
    })

}