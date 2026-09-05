
import { createRideRequstService, getRideRequest, RideRequestPayload } from "@/app/_services/rides/rideRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateRideRequest =() => {
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
export const useGetRideRequest = (id: string) => {
  return useQuery({
    queryKey: ["get_ride_request", id],
    queryFn: () => getRideRequest(id),
  });
};