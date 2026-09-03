'use client'
import MagnifyingGlassIcon from '@iconify-react/at-icons/magnifying-glass';
type RideRequestIdProps = {
    id:string
}

const Ride_request = (id:RideRequestIdProps) => {
  return (
    <div className="max-w-120 bg-gray-200 shadow-xs mx-auto px-2">
         <div className="flex max-w-100 flex-col items-center justify-center min-h-50 bg-white rounded-sm p-9 mx-auto">
            <div className="p-2 bg-(--primary)/50 rounded-full">
            <MagnifyingGlassIcon height="16" />
            </div>
         </div>
    </div>
  )
}
export default Ride_request