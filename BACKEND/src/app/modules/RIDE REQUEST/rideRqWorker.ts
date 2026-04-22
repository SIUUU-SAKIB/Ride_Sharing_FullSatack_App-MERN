import { RideRequestStatus } from "./rideRq.interface";
import { RideRequestDB } from "./rideRq.model";

const expiresRideRequests = async () => {
    const now = new Date();

    const result = await RideRequestDB.updateMany({
        status: RideRequestStatus.PENDING,
        expiresAt: { $lte: now }
    }, {
        $set: {
            status: RideRequestStatus.EXPIRED
        }
    })
    if (result.modifiedCount > 0) {
  console.log(`Expired ${result.modifiedCount} ride requests`);
}
}

export const rideExpirationWorker = () => {
  setInterval(async () => {
    try {
      await expiresRideRequests();
    } catch (err) {
      console.error("Expire worker error:", err);
    }
  }, 60 * 1000);
};