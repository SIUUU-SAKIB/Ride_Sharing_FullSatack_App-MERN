import { RideRequestStatus } from "./rideRq.interface";
import { RideRequestDB } from "./rideRq.model";

const expiresRideRequests = async () => {
    const now = Date.now();

    const result = await RideRequestDB.updateMany({
        statusc: RideRequestStatus.PENDING,
        expiresAt: { $lte: now }
    }, {
        $set: {
            status: RideRequestStatus.EXPIRED
        }
    })
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