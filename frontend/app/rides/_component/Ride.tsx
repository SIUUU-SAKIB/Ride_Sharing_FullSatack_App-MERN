'use client'
import BottomNav from '@/app/_components/Navigation/BottomNav';
import LocationAlt2FilledIcon from '@iconify-react/boxicons/location-alt-2-filled';
import { IoCarOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { RiPinDistanceLine } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";
import { CiMoneyBill } from "react-icons/ci";
import { useGetRideRequest } from '@/app/_hooks/rides/ride_request';
import Top_Notification from './Top_Notification';
type RideRequestIDProps = {
  id:string
}
export enum RideRequestStatus {
  PENDING = "PENDING",
  REQUEST_CANCELLED = "REQUEST_CANCELLED",
  EXPIRED = "EXPIRED",
}

export enum RideStatus {
  DRIVER_ACCEPTED = "DRIVER_ACCEPTED",
  DRIVER_ARRIVING = "DRIVER_ARRIVING",
  DRIVER_ARRIVED = "DRIVER_ARRIVED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
type RideActionStatus = RideRequestStatus | RideStatus;
const rideActionConfig: Record<
  RideActionStatus,
  {
    label: string | null;
    action: string | null;
    className: string;
  }
> = {
  PENDING: {
    label: "Cancel Ride Request",
    action: "cancel_request",
    className: "border-red-500 text-red-500",
  },

  REQUEST_CANCELLED: {
    label: "Request Another Ride",
    action: "request_again",
    className: "bg-(--primary) text-white",
  },

  EXPIRED: {
    label: "Request Another Ride",
    action: "request_again",
    className: "bg-(--primary) text-white",
  },

  DRIVER_ACCEPTED: {
    label: "Track Driver",
    action: "track_driver",
    className: "bg-(--primary) text-white",
  },

  DRIVER_ARRIVING: {
    label: "Track Driver",
    action: "track_driver",
    className: "bg-(--primary) text-white",
  },

  DRIVER_ARRIVED: {
    label: null,
    action: null,
    className: "",
  },

  IN_PROGRESS: {
    label: "View Trip",
    action: "view_trip",
    className: "bg-(--primary) text-white",
  },

  COMPLETED: {
    label: "Rate Your Ride",
    action: "rate_ride",
    className: "bg-(--primary) text-white",
  },

  CANCELLED: {
    label: "Request Another Ride",
    action: "request_again",
    className: "bg-(--primary) text-white",
  },
};
type RideActionProps = {
  status: RideStatus;
};
const Ride = ({id}:RideRequestIDProps) => {
  const { data, isLoading, isError } = useGetRideRequest(id)
  const status = data?.data?.status as RideActionStatus 
  const currentAction = status ? rideActionConfig[status] : undefined
  const rideInformation = [
    { title: 'Vehicle', info: data?.data?.vehicleRequest, icon: IoCarOutline },
    { title: 'Passengers', info: data?.data?.estimatedPassengers, icon: FiUser },
    { title: 'Distance', info: data?.data?.distanceKM, icon: RiPinDistanceLine },
    { title: 'Fare', info: data?.data?.estimatedFare, icon: CiMoneyBill },
    { title: 'Payment Method', info: data?.data?.payment, icon: MdOutlinePayment },
  ]

  return (
    <div className="max-w-120 min-h-screen bg-[#dee2e6]/30 shadow-xs mx-auto p-4">

      {/* DRIVER INFO ON *MATCHED* */}
      {/* <DriverInfo/> */}
      
      {/* 1st container */}
      <Top_Notification status={status}/>
      {/* 2nd container */}
      <div className='flex min-h-40 gap-2 p-4 bg-white rounded-xl shadow-sm mt-8 '>
        {/* side items */}
        <div className='flex flex-col gap-1 items-center'>
          <div className='p-4 bg-(--primary)/20 rounded-full'>
            <div className='dot w-3 h-3 bg-(--primary) rounded-full'></div></div>
          <div className='line h-17 w-1 bg-gray-300'></div>
          <div className='p-3 bg-red-200/50 rounded-full'>
            <LocationAlt2FilledIcon height="18" className='text-red-500' />
          </div>
        </div>
        {/* end of side items ======== */}
        {/* 3rd container // pickup and destination */}
        <div className='MAIN_CONTAINER flex flex-col gap-6 pl-2'>
          <div className='PICKUP_CONTAIENR flex gap-2 items-start flex-col'>
            <p className='text-(--neutral) text-md'>PICKUP</p>
            <p className='text-sm'>{data?.data?.pickupLocation.address}</p>
          </div>

          <div className='DESTINATION_CONTAINER flex gap-2 items-start flex-col'>
            <p className='text-(--neutral) text-md'>DESTINATION</p>
            <p className='text-sm'>{data?.data?.dropoffLocation.address}</p>
          </div>
        </div>
      </div>
      {/* end of 2nd container ========== */}
      {/* ride information */}
      <div className='RIDE INFORMATION min-h-40 rounded-xl bg-white grid grid-cols-2 items-center gap-4 p-2 mt-4'>
        {
          rideInformation.map((data, index) => <div key={index} className={`flex gap-4 bg-[#dee2e6]/30 items-center p-2 w-full shadow-xs rounded-lg ${index !== 4 ? "col-span-1" : "col-span-2"}`}>
            {data?.icon && <data.icon className='text-xl' />}
            <div className='flex flex-col gap-1'>
              <p className='text-xs text-black/80'>{data.title}</p>
              <p className='text-sm font-medium'>{data.info}</p>
            </div>
          </div>)
        }
      </div>

      {/* end of ride information */}
      {/* button */}
       {/* {currentAction && (
        <button className='w-full py-4 rounded-lg bg-green-500/70 text-white font-semibold mt-4 text-lg'>
          {currentAction.label}
        </button>
      )} */}
      <BottomNav />
    </div>

  )
}
export default Ride

