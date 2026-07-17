"use client"
import { AdminHooksForDriver } from "@/app/_hooks/dashboard/admin/driver";
import { Calendar, Phone } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";


const DriverDetail = ({ id }: { id: string }) => {
  console.log(id)
  const { data, isLoading, isError, error } = AdminHooksForDriver
    .useGetApplicationById(id as string)
  return (
    <div className='p-16'>
      <div className="flex gap-2 items-center pb-4">
        <GoArrowLeft />
        <Link href="/dashboard/admin/drivers" className="text-md text-(--neutral)">Back to Drivers List</Link>
        </div>
        {/* main data */}
        <div className="flex flex-col w-full p-8 bg-white rounded-sm shadow-xs">
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-8 items-center">
              <Image
                src={'/ronaldo.jpg'}
                alt="profile photo"
                width={500}
                height={500}
                className="w-16 h-16 object-cover rounded-full"
              />
              <div className="gap-2 flex flex-col"> 
                <p className="text-2xl font-medium ">Robert Fox</p>
              <div className="flex gap-4">
                <p className={`bg-red-100 rounded-sm px-2 py-1 text-sm font-light text-red-900`}>Pending</p>
                <div className="flex gap-1 items-center">
                  <Calendar size={16} strokeWidth={0.95}  className="font-light text-xs"/>
                  <p className="font-light ">Applied: Oct 24, 2024</p>
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
          <div className="pt-12">
            <div className="flex gap-2 items-center">
              <div className="w-1 h-4 bg-green-700"></div>
              <p>Pesonal and Vehicle Details</p>
            </div>
            class  {
              constructor(parameters) {
                
              }
            }
          </div>
          {/* end of perssonal and vehicle details  */}
        </div>
        {/* main data end  */}


      
    </div>
  )
}

export default DriverDetail