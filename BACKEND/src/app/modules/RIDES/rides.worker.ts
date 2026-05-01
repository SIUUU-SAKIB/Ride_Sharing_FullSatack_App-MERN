
import { RideRequestStatus } from "../RIDE REQUEST/rideRq.interface";
import { RideRequestDB } from "../RIDE REQUEST/rideRq.model";



const expireRideRequests = async () => {
  const now = new Date();

  const result = await RideRequestDB.updateMany(
    {
      status: RideRequestStatus.PENDING,
      expiresAt: { $lte: now },
    },
    {
      status: RideRequestStatus.EXPIRED,
    }
  );

  if (result.modifiedCount > 0) {
    console.log(`Expired ${result.modifiedCount} ride requests`);
  }
};

export const startRideExpirationWorker = () => {
  setInterval(async () => {
    try {
      await expireRideRequests();
    } catch (error) {
      console.error("Expiration worker error:", error);
    }
  }, 10 * 1000);
};
