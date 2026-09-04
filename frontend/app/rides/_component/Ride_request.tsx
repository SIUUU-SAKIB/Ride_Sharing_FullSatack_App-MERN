'use client'
import BottomNav from '@/app/_components/Navigation/BottomNav';
import MagnifyingGlassIcon from '@iconify-react/at-icons/magnifying-glass';
import LocationAlt2FilledIcon from '@iconify-react/boxicons/location-alt-2-filled';
type RideRequestIdProps = {
    id:string
}

const Ride_request = (id:RideRequestIdProps) => {
  return (
    <div className="max-w-120 min-h-screen bg-gray-100/50 shadow-xs mx-auto p-4">
      {/* 1st container */}
         <div className="flex max-w-100 flex-col items-center justify-center min-h-50 bg-white shadow-sm mx-auto gap-2 rounded-xl">
            <div className="p-4 bg-(--primary)/20 rounded-full">
            <MagnifyingGlassIcon height="24" className='text-(--primary)'/>
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
        <div className='flex min-h-40 gap-2 p-4 bg-white rounded-xl shadow-sm mt-4 '>
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
          {/* pickup and destination */}
          <div className='MAIN_CONTAINER flex flex-col gap-6 pl-2'>
            <div className='PICKUP_CONTAIENR flex gap-2 items-start flex-col'>
              <p className='text-(--neutral) text-md'>PICKUP</p>
              <p className='text-sm'>Shahjalal Uposhohor, Main Road, 3100 Sylhet, Sadar Upazilla, Bangladesh</p>
            </div>
            
             <div className='DESTINATION_CONTAIENR flex gap-2 items-start flex-col'>
              <p className='text-(--neutral) text-md'>DESTINATION</p>
              <p className='text-sm'>Shahjalal Uposhohor, Main Road, 3100 Sylhet, Sadar Upazilla, Bangladesh</p>
            </div>
          </div>
          {/* end of pickup and destination  =====*/}
        </div>



        {/* end of 2nd container ========== */}
    </div>
  )
}
export default Ride_request