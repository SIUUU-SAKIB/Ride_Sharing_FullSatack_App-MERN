'use client'
import BottomNav from '@/app/_components/Navigation/BottomNav';
import MagnifyingGlassIcon from '@iconify-react/at-icons/magnifying-glass';
import LocationAlt2FilledIcon from '@iconify-react/boxicons/location-alt-2-filled';
import { IoMdCheckmark } from "react-icons/io";
import { IoCarOutline } from "react-icons/io5";
import { FiUser, FiUsers } from "react-icons/fi";
import { RiPinDistanceLine } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";
import { CiMoneyBill } from "react-icons/ci";
import { useGetRideRequest } from '@/app/_hooks/rides/ride_request';


  const rideStatus = [
    { title: "Requst Submitted" },
    { title: "Finding a Driver" },
    { title: "Driver Accepted" },
    { title: "Ride Started" },
    { title: "Ride Completed" }
  ]
  const indicators = [
    { serial: 1 }, { serial: 2 }, { serial: 3 }, { serial: 4 }, { serial: 5 },

  ]
const Ride_request = (id: string) => {

      const {data} = useGetRideRequest(id.id as string)

  const rideInformation = [
    { title: 'Vehicle', info: data?.data?.vehicleRequest, icon: IoCarOutline },
    { title: 'Passengers', info: data?.data?.estimatedPassengers, icon: FiUser },
    { title: 'Distance', info: data?.data?.distanceKM, icon: RiPinDistanceLine },
    { title: 'Fare', info: data?.data?.estimatedFare, icon: CiMoneyBill },
    { title: 'Payment Method', info: data?.data?.payment, icon: MdOutlinePayment },
  ]
  const fulfilledHtml = <div className='bg-(--primary) flex items-center justify-center p-2 rounded-full'>
    <IoMdCheckmark className='text-white text-xs' />
  </div>
  const pendingHtml = <div className='w-8 h-8 bg-(--primary)/30 rounded-full flex items-center justify-center'><div className='w-3 h-3 rounded-full bg-(--primary)'></div></div>



  return (

    <div className="max-w-120 min-h-screen bg-[#dee2e6]/30 shadow-xs mx-auto p-4">
      {/* 1st container */}
      <div className="flex max-w-100 flex-col items-center justify-center min-h-50 bg-white shadow-sm mx-auto gap-2 rounded-xl">
        <div className="p-4 bg-(--primary)/20 rounded-full">
          <MagnifyingGlassIcon height="24" className='text-(--primary)' />
        </div>
        <p className='text-xl font-bold'>Finding a Driver</p>
        <p>Your ride request has been submitted</p>
        <div className='flex gap-2 items-center py-1 px-2 bg-(--primary)/20 rounded-full'>
          <div className='dot w-2 h-2 bg-(--primary) rounded-full'></div>
          <p className='text-(--primary) text-sm'>Active</p>
        </div>

      </div>
      {/* end of 1st container====== */}
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
      {/* ride information ==== */}
      <div className="min-h-40 bg-white p-4 rounded-lg shadow-xs flex gap-2 items-center mt-8">

        {/* Indicators */}
        <div className="relative flex flex-col gap-4 items-center">

          <div className="absolute top-4 bottom-4 w-px bg-gray-300" />
          <div className="relative z-10 flex flex-col gap-4">
            {indicators.map((e) => (
              <div
                key={e.serial}
                className="w-8 h-8 bg-(--primary)/30 rounded-full flex items-center justify-center"
              >
                <div className="w-3 h-3 rounded-full bg-(--primary)" />
              </div>
            ))}
          </div>
        </div>
        {/* Ride status */}
        <div className="flex flex-col gap-4">
          {rideStatus.map((ride, index) => (
            <div key={index} className={`h-8 flex items-center text-md `}>
              {ride.title}
            </div>
          ))}
        </div>

      </div>
      {/* end of ride information */}
      {/* button */}
      <button className='mb-20 mt-8 w-full py-4 border-2 bg-white text-lg border-red-500 rounded-lg px-4 text-red-600 font-medium'>Can Ride Request</button>
          <BottomNav/>
    </div>

  )
}
export default Ride_request