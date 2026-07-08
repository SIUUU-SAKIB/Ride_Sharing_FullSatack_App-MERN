import { AdminHooksForDriver } from '@/app/_hooks/dashboard/admin/driver'
import Image from 'next/image'
import React from 'react'
type SearchResultProps = {
    search: string,
    status: string,
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

const SearchResult = ({ search, status }: SearchResultProps) => {
    const [page, setPage] = React.useState<number>(1)
    const[limit, setLimit] = React.useState<number>(3)
    const {data, isLoading, isError} = AdminHooksForDriver.useAllApplications(page, limit, search, status)
    const driverData = data?.data
console.log(driverData[0].userId.name)
    return (
        <div className='w-full shadow-xs py-8 bg-white my-8 px-2'>
            <ul className="grid grid-cols-9 p-4">
                {items.map((item, index) => (
                    <li key={item.title} className={`text-(--neutral) ${index === 0 && 'col-span-3'}`}>
                        {item.title}
                    </li>
                ))}
            </ul>
            <div>
                {contents.map((item, index) => (
                    <div
                        key={index}
                        className={`grid grid-cols-9 items-center p-4 ${index !== contents.length - 1
                            ? "border-b border-gray-200/50"
                            : ""
                            }`}
                    >
                        <div className="flex items-center col-span-3 gap-2 pr-12">
                            <Image src={item.image} width={500} height={500} alt='profile image' className='w-12 object-cover rounded-full p-2' />
                            <div >
                                <p className='text-lg font-medium'>{item.name}</p>
                                <p className='text-(--neutral) text-sm'>({item.phone})</p>
                            </div>
                        </div>
                        <p className='text-zinc-700 ' >{item.vehicle}</p>
                        <p className='text-zinc-700 '>{item.licenseNo}</p>                       <p className='text-zinc-700 '>{item.appliedOn}</p>
                        <p className={`font-medium ${item.status === "Approved" && 'text-green-500' || item.status === "Rejected" && 'text-red-500' || item.status === "Pending" && 'text-yellow-500'}`}>{item.status}</p>

                        <button className="font-medium text-red-500  cursor-pointer">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchResult