import React from 'react'
type RideReqNavProps = {
  rideStatus: string;
};
const Ride_Nav = ({rideStatus}:RideReqNavProps) => {
    
    const items = [
        {name:'PENDING'},{name:'MATCHED'},{name:'CANCELLED'},{name:'EXPIRED'}
    ]
  return (
    <ul className=' flex gap-5 items-center justify-between p-2 border border-gray-200 shadow-xs rounded-lg mb-4'>
        {
            items.map((item, index) =>( <li key={index} className={`font-semibold text-sm ${item.name === rideStatus ? "shadow-xs text-white px-2 py-1 bg-green-600 rounded-lg":"text-zinc-700 "}`}>
                {item.name}
            </li>))
        }
    </ul>
  )
}

export default Ride_Nav;
