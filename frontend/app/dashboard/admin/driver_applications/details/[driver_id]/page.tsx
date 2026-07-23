
import DriverDetail from "../../../_components/driver_applications/ApplicationDetail"
type Props = {
  params:Promise<{
    driver_id:string
  }>
}
const Details= async({
  params
}:Props) => {
  const {driver_id} = await params
  return (
    <div className="w-full">
      <div className="py-4 px-2 bg-white shadow-xs text-(--primary) font-medium text-2xl">RideX Driver Application Review</div>
      <DriverDetail id={driver_id}/>
    </div>
  )
}

export default Details