"use client"
import { AdminHooksForDriver } from "@/app/_hooks/dashboard/admin/driver";
import { Calendar, CircleCheck, CircleX, EllipsisVertical, MailPlus, PhoneCall } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { GoArrowLeft, GoMail } from "react-icons/go";
import { formatDate } from "./DriverList";
import React from "react";
import LoadingScreen from "@/app/_components/ui/LoadingScreen";
import Swal from "sweetalert2";


const DriverDetail = ({ id }: { id: string }) => {
  const [drop, setDrop] = React.useState<boolean>(false)
  const { data, isLoading, isError, error } = AdminHooksForDriver
    .useGetApplicationById(id as string)
    const approveApplicationMutation = AdminHooksForDriver.useApproveApplication()
    if(isLoading)return <LoadingScreen/>
    if(error) return <p className="w-full h-full text-center text-2xl font-bold text-red-500">SOMETHING BAD HAPPEND PAL</p>
  const licenseURL = data?.data?.licenseImage[0].url
  const vehicleURL = data?.data?.vehicleImage[0].url
  const rejectButton = () => {
    alert(`rejected`)
  }
const approveButton = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You really want to approve this application?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, approve this application",
  }).then(async (result) => {
    if (!result.isConfirmed) return;
    try {
      await approveApplicationMutation.mutateAsync(id);

      Swal.fire({
        title: "Success!",
        text: "Application has been approved successfully.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to approve the application.",
        icon: "error",
      });
    }
  });
};
  return (
    <div className='px-8 pt-4'>
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
                <p className={`rounded-sm px-2 py-1 text-sm ${data?.data?.status === "Pending" && "text-gray-700 bg-gray-200" || data?.data?.status === "Approved" && "text-green-700 bg-green-200" || data?.data?.status === "Rejected" && "bg-red-200 text-red-700"}`}>{data?.data?.status}</p>
                <div className="flex gap-1 items-center">
                  <Calendar size={16} strokeWidth={0.95} className="font-light text-xs" />
                  <p className="font-light ">{data?.data?.status === "Pending" && "Applied on:" || data?.data?.status === "Approved" && "Approved on:" || data?.data?.status === "Pending" && "Applied on:"} <span className="font-medium">{formatDate(data?.data?.createdAt)}</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 shadow-sm">
              <button className="text-sm font-medium text-gray-700">
                Contact
              </button>

              <button
                onClick={() => setDrop((prev) => !prev)}
                className="rounded-md p-1 hover:bg-gray-200 transition"
              >
                <EllipsisVertical strokeWidth={1.5} className="w-5 h-5 cursor-pointer" />
              </button>
            </div>

            {drop && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl border border-gray-200 bg-white shadow-lg z-50 overflow-hidden">
                <button
                  className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                >
                  <PhoneCall className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Call Driver</span>
                </button>

                <button
                  className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                >
                  <MailPlus className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Send Email</span>
                </button>
              </div>
            )}
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
                {
                  licenseURL && <Image src={data?.data?.licenseImage[0]?.url || ""}
                    alt="driving license image"
                    width={500}
                    height={500}
                    className="w-full h-75 object-contain"
                  />
                }
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <p>Vehicle Image</p>
              <div className="p-4 bg-white shadow-sm rounded-sm">
                {
                  vehicleURL && <Image src={data?.data?.vehicleImage[0]?.url || ""}
                    alt="driving license image"
                    width={5000}
                    height={500}
                    className="w-full h-75 object-contain"
                  />
                }
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
            <textarea placeholder="Please specify the reason if rejcting this application" className="h-50 w-full shadow-xs border-none outline-none p-4 rounded-sm active:border-(--primary) " />
          </div>
        </div>
        {/* end of review section  */}
        {/* action buttons */}
        <div className="w-full flex justify-end gap-4">
          <div onClick={rejectButton} className="flex items-center gap-1 px-4 py-2 border-2 border-red-500 rounded-md cursor-pointer">
            <CircleX className="text-red-500" />
            <p className="text-red-500 font-medium">Rejct application</p>
          </div>

          <div onClick={approveButton} className="flex items-center gap-1 px-4 py-2 bg-(--primary) rounded-md cursor-pointer">
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