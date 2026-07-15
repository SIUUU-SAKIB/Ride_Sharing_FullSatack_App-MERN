"use client"
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";


const DriverDetail = ({ id }: { id: string }) => {
  console.log(id)
  return (
    <div className='p-16'>
      <div className="flex gap-2 items-center">
        <GoArrowLeft/>
        <Link href="/dashboard/admin/drivers" className="text-md text-(--neutral)">Back to Drivers List</Link>
      </div>
    </div>
  )
}

export default DriverDetail