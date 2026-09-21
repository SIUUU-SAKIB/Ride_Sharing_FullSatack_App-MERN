'use client'
import MagnifyingGlassIcon from '@iconify-react/at-icons/magnifying-glass';
import {motion} from "motion/react"
type StatusType = {
    status:string
}
const rideRequestStatusConfig = {
  PENDING: {
    title: "Finding a Driver",
    message: "We're looking for a driver near you",
    label: "Searching",
    badge: "bg-(--primary)/20 text-(--primary)",
  },

  CANCELLED: {
    title: "Ride Request Cancelled",
    message: "Your ride request has been cancelled",
    label: "Cancelled",
    badge: "bg-red-500/20 text-red-600",
  },

  EXPIRED: {
    title: "Ride Request Expired",
    message: "No driver accepted your request in time",
    label: "Expired",
    badge: "bg-red-500/20 text-red-600",
  },
};
const rideStatusConfig = {
  DRIVER_ACCEPTED: {
    title: "Driver Found",
    message: "Your driver has accepted the ride",
    label: "Driver Found",
    badge: "bg-(--primary)/20 text-(--primary)",
  },

  DRIVER_ARRIVING: {
    title: "Driver Is On The Way",
    message: "Your driver is heading to your pickup location",
    label: "On The Way",
    badge: "bg-(--primary)/20 text-(--primary)",
  },

  DRIVER_ARRIVED: {
    title: "Driver Has Arrived",
    message: "Your driver is waiting at the pickup location",
    label: "Arrived",
    badge: "bg-(--primary)/20 text-(--primary)",
  },

  IN_PROGRESS: {
    title: "Ride In Progress",
    message: "You're on your way to your destination",
    label: "In Progress",
    badge: "bg-blue-500/20 text-blue-600",
  },

  COMPLETED: {
    title: "Ride Completed",
    message: "You've reached your destination",
    label: "Completed",
    badge: "bg-green-500/20 text-green-600",
  },

  REQUEST_CANCELLED: {
  title: "Ride Request Cancelled",
  message: "Your ride request has been cancelled",
  label: "Cancelled",
  badge: "bg-red-500/20 text-red-600",
}
};

const Top_Notification = ({status}:StatusType) => {
    const statusConfig = {

    }
  return (
     <div className="flex max-w-100 flex-col items-center justify-center w-full min-h-55 bg-white shadow-sm mx-auto gap-2 rounded-xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="p-4 bg-(--primary)/20 rounded-full">
          <MagnifyingGlassIcon height="24" className='text-(--primary)' />
        </motion.div>
        <p className='text-xl font-bold'>{
          status === "MATCHED" && "Driver Found" ||
          status === "PENDING" && "Finding a Driver" ||
          status === "CANCELLED" && `Ride Request Cancelled` ||
          status === "EXPIRED" && "Ride Request Expired"}</p>

        <p className='text-center px-2'>{status === "PENDING" && "Ride Request Submitted" ||
          status === "MATCHED" && "Your driver has accepted and heading to your way" ||
          status === "CANCELLED" && "Your ride request has been cancelled" ||
          status === "EXPIRED" && "Your ride request expired because no driver accepted in time"}</p>
        <div className={`flex items-center py-1 px-2 ${status ==="PENDING" && 'bg-(--primary)/20' ||status ==="EXPIRED" && 'bg-red-500/30' } rounded-full`}>
          <div className='dot w-2 h-2 bg-(--primary) rounded-full'></div>
          <p className={`text-(--primary) text-sm px-2`}>{status === "PENDING" && "Pending" ||
            status === "CANCELLED" && "Cancelled" ||
            status === "EXPIRED" && "Expired" ||
            status === "MATCHED" && "Matched"}</p>
        </div>

      </div>
  )
}

export default Top_Notification