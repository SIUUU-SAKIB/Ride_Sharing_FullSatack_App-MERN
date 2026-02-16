import { IRideLocation, IRideRequest, RideRequestStatus } from "./rides.interface";
import { RidesRQDB } from "./rides.model";

const createRideRequest = async(riderId:string, pickupLocation:IRideLocation, dropOffLocation:IRideLocation) => {
const expiresAt = new Date(Date.now() + 2 * 60 * 1000)
const rideRequest = await RidesRQDB.create({
    riderId,
    pickupLocation,
    dropOffLocation,
    status:RideRequestStatus.PENDING,
    expiresAt
})

return rideRequest
}

export const RidesService = {createRideRequest}


// export interface IRideRequest {
//     riderId: Types.ObjectId,
//     pickupLocation: IRideLocation,
//     dropOffLocation: IRideLocation,

//     status: RideRequestStatus,
//     expiresAt: Date,
//     createdAt: Date,
//     updatedAt: Date
// }