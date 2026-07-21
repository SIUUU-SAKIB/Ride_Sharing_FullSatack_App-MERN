import LoadingScreen from '@/app/_components/ui/LoadingScreen'
import { AdminHooksForDriver } from '@/app/_hooks/dashboard/admin/driver'
import { IDriverStatus } from '@/app/_interfaces/driver.interface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GoTriangleLeft, GoTriangleRight } from 'react-icons/go'
export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
        day: "2-digit",
        month: "numeric",
        year: '2-digit',
        hour: "2-digit",
        minute: "numeric"
    })
}
type DriverListProps = {
    search: string,
    status: string,
}
interface userInfo {
    profilePhoto: string,
    name: string
}
interface DriverDetailsProps {
    _id: string,
    userId: userInfo,
    licenseNumber: string;
    vehicleNumber: string;
    vehicleType: string;
    vehicleName: string,
    nidNumber: string;
    phoneNumber: string;
    bloodType: string;
    address: string;
    status: IDriverStatus;
    isBlocked: boolean,
    profilePhoto: string,
    createdAt: string
}
const items = [
    { title: "Driver" },
    { title: "Vehicle" },
    { title: "License No" },
    { title: "Applied On" },
    { title: "Status" },
    { title: "Action" }
]
const contents = [
    {
        image: "/demo_profile.jpg", name: "Alex Johnson", licenseNo: "DL-27742980", appliedOn: "12 Dec 2025", status: "Rejected", vehicle: "Toyota Prius", phone: "01796414761"
    },
    {
        image: "/demo_profile.jpg", name: "Alex Johnson", licenseNo: "DL-27742980", appliedOn: "12 Dec 2025", status: "Approved", vehicle: "Toyota Prius", phone: "01796414761"
    },
    {
        image: "/demo_profile.jpg", name: "Alex Johnson", licenseNo: "DL-27742980", appliedOn: "12 Dec 2025", status: "Rejected", vehicle: "Toyota Prius", phone: "01796414761"
    },
    {
        image: "/demo_profile.jpg", name: "Alex Johnson", licenseNo: "DL-27742980", appliedOn: "12 Dec 2025", status: "Pending", vehicle: "Toyota Prius", phone: "01796414761"
    },
    {
        image: "/demo_profile.jpg", name: "Alex Johnson", licenseNo: "DL-27742980", appliedOn: "12 Dec 2025", status: "Approved", vehicle: "Toyota Prius", phone: "01796414761"
    },
]

const ApplicationList = ({ search, status }: DriverListProps) => {
    const [page, setPage] = React.useState<number>(1)
    const [limit, setLimit] = React.useState<number>(5)
    const { data: driverData, isLoading, isError } = AdminHooksForDriver.useAllApplications(page, limit, search, status)
    if (isLoading) { return <LoadingScreen /> }
    if (isError) { return <p className='text-2xl font-bold text-red-500 h-full w-full text-center'>SOMETHING BAD HAPPEND</p> }
    return (
        <div className='w-full shadow-xs py-8 bg-white my-8 px-2'>
            <ul className="grid grid-cols-9 p-4">
                {items.map((item, index) => (
                    <li key={item.title} className={`text-(--neutral) ${index === 0 && 'col-span-2' || index === 3 && 'col-span-2' || index === 1 && 'col-span-2'}`}>
                        {item.title}
                    </li>
                ))}
            </ul>
            <div>
                {driverData?.data?.length > 0 ? driverData?.data?.map((item: DriverDetailsProps, index: number) => (
                    <div
                        key={index}
                        className={`grid grid-cols-9 items-center p-4 ${index !== contents.length - 1
                            ? "border-b border-gray-200/70"
                            : ""
                            }`}
                    >
                        <div className="flex items-center col-span-2 gap-2 pr-12">
                            <Image src={item?.userId?.profilePhoto || '/demo_profile.jpg'} width={500} height={500} alt='profile image' className='w-12 h-12 object-cover rounded-full p-2' />
                            <div >
                                <p className='text-lg font-medium'>{item?.userId?.name}</p>
                                <p className='text-(--neutral) text-sm'>({item.phoneNumber})</p>
                            </div>
                        </div>
                        <p className='text-zinc-700 col-span-2' >{item.vehicleName}</p>
                        <p className='text-zinc-700 '>{item.licenseNumber}</p>
                        <p className='text-zinc-700 col-span-2'>{formatDate(item.createdAt)}</p>
                        <p className={`font-medium ${item.status === "Approved" && 'text-green-500' || item.status === "Rejected" && 'text-red-500' || item.status === "Pending" && 'text-yellow-500'}`}>{item.status}</p>

                        <Link href={`/dashboard/admin/drivers/details/${item._id}`}
                            className="font-medium text-red-500  cursor-pointer">
                            View Details
                        </Link>
                    </div>
                )) : (<div className='text-xl font-medium text-center'>No driver found</div>)}
            </div>
            <div className='w-full flex items-center justify-between pt-8 px-4'>
                <p className='text-sm font-medium'>Showing {driverData?.data?.length} of {driverData.meta.total} entries</p>
                {/* PAGINATION */}
                <div className='flex gap-2 items-center'>
                    <button disabled={page === 1} onClick={() => setPage(page => page - 1)}><GoTriangleLeft className={`text-4xl text-(--primary) bg-(--primary)/20 ${page === 1 ? "cursor-not-allowed" : "cursor-pointer"} hover:bg-(--primary) transition duration-100 hover:text-white `} /></button>
                    <p className='text-md font-light'>Showing page <span className='font-semibold text-(--primary)'>{driverData?.meta?.page}</span> of total <span className='font-semibold text-(--primary)'>{driverData?.meta?.totalPage}</span></p>
                    <button disabled={page === driverData?.meta?.totalPage} onClick={() => { setPage(page => page + 1), console.log('working') }}><GoTriangleRight className={`text-4xl text-(--primary) bg-(--primary)/20 ${page === driverData?.meta?.totalPage ? "cursor-not-allowed" : "cursor-pointer"} hover:bg-(--primary) transition duration-100 hover:text-white `} /></button>
                </div>
            </div>


        </div>
    )
}

export default ApplicationList