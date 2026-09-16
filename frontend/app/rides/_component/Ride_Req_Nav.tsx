import React from 'react'
type RideReqNavProps = {
  rideStatus: string;
};
const Ride_Req_Nav = ({rideStatus}:RideReqNavProps) => {
    console.log(rideStatus + "from nav")
    const items = [
        {name:'STATUS'},{name:'PENDING'},{name:'MATHCED'},{name:'EXPIRED'}
    ]
  return (
    <ul className='w-full flex gap-5 items-center justify-between p-2 border border-gray-200 shadow-xs rounded-lg mb-4'>
        {
            items.map((item, index) =>( <li key={index} className="font-semibold text-sm text-zinc-700">
                {item.name}
            </li>))
        }
    </ul>
  )
}

export default Ride_Req_Nav