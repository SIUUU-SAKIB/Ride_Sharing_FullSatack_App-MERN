import React from 'react'

const RideRequest = async({params}:{params:Promise<{ride_request:string}>}) => {
  const  {ride_request}=await params
  console.log(ride_request)

  return (
    <div>RideRequest</div>
  )
}

export default RideRequest