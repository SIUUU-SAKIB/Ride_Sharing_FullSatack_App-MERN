
export interface RideRequestPayload {
  pickupLocation: {
    lat: number;
    lng: number;
    address: string;
  };

  dropoffLocation: {
    lat: number;
    lng: number;
    address: string;
  };

  vehicleRequest: string;
  estimatedPassengers: number;
  payment: string;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const createRideRequstService = async(payload:RideRequestPayload) => {
    const response = await fetch(`${API_URL}/ride-request/create`, {
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        credentials:"include",
        body:JSON.stringify(payload)
    })
    const data = await response.json()
    if(!response.ok) {
        throw new Error(data.message || "Failed to create ride request")
    }
    console.log(data)
    return data
}
