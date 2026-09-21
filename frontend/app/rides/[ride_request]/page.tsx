import Ride from '../_component/Ride';
const RideRequest = async ({ params }: { params: Promise<{ ride_request: string }> }) => {
  const { ride_request } = await params;
  return (
        <Ride id={ride_request}/>

  )
}

export default RideRequest
