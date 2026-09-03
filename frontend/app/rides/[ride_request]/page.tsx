
import Ride_request from '../_component/Ride_request';
const RideRequest = async ({ params }: { params: Promise<{ ride_request: string }> }) => {
  const { ride_request } = await params;
  return (

        <Ride_request id={ride_request}/>

  )
}

export default RideRequest
