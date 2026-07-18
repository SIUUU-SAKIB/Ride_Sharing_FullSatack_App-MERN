"use client"
import { AdminHooksForDriver } from "@/app/_hooks/dashboard/admin/driver";
import { Calendar, CircleCheck, CircleX, Phone } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import { formatDate } from "./DriverList";


const DriverDetail = ({ id }: { id: string }) => {
  console.log(id)
  const { data, isLoading, isError, error } = AdminHooksForDriver
    .useGetApplicationById(id as string)
     console.log(data?.data?.vehicleImage[0].url)
  return (
    <div className='p-8'>
      <div className="flex gap-2 items-center pb-4">
        <GoArrowLeft />
        <Link href="/dashboard/admin/drivers" className="text-md text-(--neutral)">Back to Drivers List</Link>
        </div>
        {/* main data */}
        <div className="flex flex-col w-full p-8 bg-white rounded-sm shadow-xs">
          <div className="flex gap-4 items-center justify-between border-b border-gray-100 pb-8">
            <div className="flex gap-8 items-center">
              <Image
                src={'/ronaldo.jpg'}
                alt="profile photo"
                width={500}
                height={500}
                className="w-16 h-16 object-cover rounded-full"
              />
              <div className="gap-2 flex flex-col"> 
                <p className="text-2xl font-medium ">{data?.data?.userId?.name}</p>
              <div className="flex gap-4">
                <p className={`bg-red-100 rounded-sm px-2 py-1 text-sm text-red-900`}>{data?.data?.status}</p>
                <div className="flex gap-1 items-center">
                  <Calendar size={16} strokeWidth={0.95}  className="font-light text-xs"/>
                  <p className="font-light ">Applied on: <span className="font-medium">{formatDate(data?.data?.createdAt)}</span></p>
                </div>
              </div>
              </div>
            </div>
            <div className="flex gap-2 items-center bg-gray-100 rounded-lg shadow-sm px-2 py-1">
              <Phone strokeWidth={0.75} size={20}/>
              <button className="text-lg font-light" >Contact</button>
            </div>
          </div>
          {/* personal and vehicle details */}
          <div className="pt-8 w-full pb-8 border-b border-gray-100">
            <div className="flex gap-2 items-center">
              <div className="w-1 h-4 bg-green-700"></div>
              <p>Pesonal and Vehicle Details</p>
            </div>
            <div className="flex gap-12 px-4 pt-4 items-center justify-between"> 
             {/* part-1 */}
             <div className="w-full flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-800">License Number</p>
                <p className="font-semibold">{data?.data?.licenseNumber}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-800">Vehicle</p>
                <p className="font-semibold">{data?.data?.vehicleName}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-800">Vehicle Number</p>
                <p className="font-semibold">{data?.data?.vehicleNumber}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-800">License Number</p>
                <p className="font-semibold">{data?.data?.licenseNumber}</p>
              </div>
             </div>
                {/* part-2 */}
                   <div className="w-full flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-800">Ownership</p>
                <p className="font-semibold">{data?.data?.vehicleOwnership}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-800">Blood Group</p>
                <p className="font-semibold">{data?.data?.bloodType}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-800">Gender</p>
                <p className="font-semibold">{data?.data?.gender}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-800">Home Address</p>
                <p className="font-semibold">{data?.data?.address}</p>
              </div>
             </div>
             </div>
          </div>
          {/* end of perssonal and vehicle details  */}

          {/* uploaded documents */}
          <div className="pt-8 w-full">
            <div className="flex gap-2 items-center">
              <div className="h-4 w-1 bg-green-700"></div>
              <p>Uploaded Documents</p>
            </div>
        <div className="flex gap-4 items-center justify-evenly py-8">
          <div className="flex flex-col gap-2 w-full">
            <p>Driving License Image</p>
           <div className="p-4 bg-white shadow-sm rounded-sm">
             <Image
               src={data?.data?.licenseImage[0].url}
               alt="driving license image"
               width={500}
               height={500}
               className="w-full h-75 object-contain"
            />
           </div>
          </div>
             <div className="flex flex-col gap-2 w-full">
            <p>Vehicle Image</p>
           <div className="p-4 bg-white shadow-sm rounded-sm">
             <Image
               src={data?.data?.vehicleImage[0].url}
               alt="driving license image"
               width={5000}
               height={500}
               className="w-full h-75 object-contain"
            />
           </div>
          </div>
        </div>
          </div>
          {/* end of uploaded documents  */}

          
          {/* review section */}
          <div className="pt-8 w-full pb-8 border-b border-gray-100">
            <div className="flex gap-2 items-center pb-4">
              <div className="w-1 h-4 bg-green-700"></div>
              <p>Review Section</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-gray-800">Rejection reason (optional)</p>
              <textarea placeholder="Please specify the reason if rejcting this application" className="h-50 w-full shadow-xs border-none outline-none p-4 rounded-sm active:border-(--primary) "/>
            </div>
          </div>
          {/* end of review section  */}
            {/* action buttons */}
        <div className="w-full flex justify-end gap-4">
          <div className="flex items-center gap-1 px-4 py-2 border-2 border-red-500 rounded-md cursor-pointer">
            <CircleX className="text-red-500" />
            <p className="text-red-500 font-medium">Rejct application</p>
          </div>

          <div className="flex items-center gap-1 px-4 py-2 bg-(--primary) rounded-md cursor-pointer">
           <CircleCheck className="text-white" />
            <p className="text-white font-medium">Approve Driver</p>
          </div>
        </div>
        </div>

        {/* main data end  */}
    </div>
  )
}

export default DriverDetail