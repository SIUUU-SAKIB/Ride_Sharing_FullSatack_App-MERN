import Image from 'next/image'
import React from 'react'
type SearchResultProps = {
    searchDriver: string,
    status: string,
    vehicleType: string
}
const SearchResult = ({ searchDriver, status, vehicleType }: SearchResultProps) => {
    const items = [
        { title: "Driver" },
        { title: "Vehicle" },
        { title: "License No" },
        { title: "NID No" },
        { title: "Applied On" },
        { title: "Status" },
        { title: "Action" }
    ]
    const contents = [
        {
            image: "/demo_profile.jpg", name: "Alex Johnson", licenseNo: "DL-27742980", NIDNo: "9162826672", appliedOn: "12 Dec 2025", status: "Rejected", vehicle: "Toyota Prius", phone: "01796414761"
        },
        {
            image: "/demo_profile.jpg", name: "Alex Johnson", licenseNo: "DL-27742980", NIDNo: "9162826671", appliedOn: "12 Dec 2025", status: "Approved", vehicle: "Toyota Prius", phone: "01796414761"
        },
        {
            image: "/demo_profile.jpg", name: "Alex Johnson", licenseNo: "DL-27742980", NIDNo: "9162826622", appliedOn: "12 Dec 2025", status: "Rejected", vehicle: "Toyota Prius", phone: "01796414761"
        },
        {
            image: "/demo_profile.jpg", name: "Alex Johnson", licenseNo: "DL-27742980", NIDNo: "9162826662", appliedOn: "12 Dec 2025", status: "Pending", vehicle: "Toyota Prius", phone: "01796414761"
        },
        {
            image: "/demo_profile.jpg", name: "Alex Johnson", licenseNo: "DL-27742980", NIDNo: "9162826629", appliedOn: "12 Dec 2025", status: "Approved", vehicle: "Toyota Prius", phone: "01796414761"
        },
    ]

    return (
        <div className='w-full shadow-xs py-8'>
            <ul className="grid grid-cols-9 p-4">
                {items.map((item, index) => (
                    <li key={item.title} className={`text-(--neutral) ${index === 0 && 'col-span-2'}`}>
                        {item.title}
                    </li>
                ))}
            </ul>
            <div>
                {contents.map((item, index) => (
                    <div
                        key={item.NIDNo}
                        className={`group grid grid-cols-9 items-center p-4 ${index !== contents.length - 1
                            ? "border-b border-gray-300"
                            : ""
                            }`}
                    >
                        <div className="flex items-center col-span-2 gap-2 pr-12">
                            <Image src={item.image} width={500} height={500} alt='profile image' className='w-12 object-cover rounded-full p-2' />
                            <div >
                                <p>{item.name}</p>
                                <p className='text-(--neutral) text-sm'>({item.phone})</p>
                            </div>
                        </div>
                        <p className='text-zinc-700 ' >{item.vehicle}</p>
                        <p className='text-zinc-700 '>{item.licenseNo}</p>
                        <p className='text-zinc-700 '>{item.NIDNo}</p>
                        <p className='text-zinc-700 '>{item.appliedOn}</p>
                        <p className={`font-medium ${item.status === "Approved" && 'text-green-500' || item.status === "Rejected" && 'text-red-500' || item.status === "Pending" && 'text-yellow-500'}`}>{item.status}</p>

                        <button className="font-medium text-red-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100 cursor-pointer">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchResult