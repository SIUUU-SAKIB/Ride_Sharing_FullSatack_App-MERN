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
            image: "/demo_profile.jpg", name: "Alex Johnson", licenseNo: "DL-27742980", NIDNo: "9162826672", appliedOn: "12 Dec 2025", status: "Rejected", vehicle: "Toyota Prius", phone:"01796414761"
        },
        {
            image: "/demo_profile.jpg", name: "Alex Johnson", licenseNo: "DL-27742980", NIDNo: "9162826671", appliedOn: "12 Dec 2025", status: "Approved", vehicle: "Toyota Prius", phone:"01796414761"
        },
        {
            image: "/demo_profile.jpg", name: "Alex Johnson", licenseNo: "DL-27742980", NIDNo: "9162826622", appliedOn: "12 Dec 2025", status: "Rejected", vehicle: "Toyota Prius", phone:"01796414761"
        },
        {
            image: "/demo_profile.jpg", name: "Alex Johnson", licenseNo: "DL-27742980", NIDNo: "9162826662", appliedOn: "12 Dec 2025", status: "Pending", vehicle: "Toyota Prius", phone:"01796414761"
        },
        {
            image: "/demo_profile.jpg", name: "Alex Johnson", licenseNo: "DL-27742980", NIDNo: "9162826629", appliedOn: "12 Dec 2025", status: "Approved", vehicle: "Toyota Prius", phone:"01796414761"
        },
    ]

    return (
        <div className='w-full shadow-xs py-8'>
            <ul className="grid grid-cols-7 p-4">
                {items.map((item) => (
                    <li key={item.title} className='text-(--neutral)'>
                        {item.title}
                    </li>
                ))}
            </ul>
            <div className="divide-y">
                {contents.map((item) => (
                    <div
                        key={item.NIDNo}
                        className="grid grid-cols-9 items-center p-4"
                    >
                        <div className="flex items-center gap-3 col-span-2">
                            <Image src={item.image} width={500} height={500} alt='profile image' className='w-12 object-cover rounded-full p-2'/>
                            <div >
                                <p>{item.name}</p>
                                <p className='text-(--neutral) text-sm'>({item.phone})</p>
                            </div>
                        </div>

                        <p className='text-zinc-700 ' >{item.vehicle}</p>

                        <p className='text-zinc-700 '>{item.licenseNo}</p>

                        <p className='text-zinc-700 '>{item.NIDNo}</p>

                        <p className='text-zinc-700 '>{item.appliedOn}</p>

                        <p className={`font-medium ${item.status === "Approved" && 'text-green-500' || item.status=== "Rejected" && 'text-red-500'  || item.status=== "Pending" && 'text-yellow-500'}`}>{item.status}</p>

                        <button>View</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchResult