
import Link from 'next/link';
const RideRequest = async ({ params }: { params: Promise<{ ride_request: string }> }) => {
  const { ride_request } = await params;
  return (
    <div className="">
      <div className="w-full flex items-start justify-center">
        <Link href={'/'}></Link>
      </div>
    </div>
  )
}

export default RideRequest
