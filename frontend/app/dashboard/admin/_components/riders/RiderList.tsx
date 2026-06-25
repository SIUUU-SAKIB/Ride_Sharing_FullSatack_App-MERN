import Image from 'next/image'
import React from 'react'
type IRideList = {
    search: string,
    status: string
}
const RiderList = ({ search, status }: IRideList) => {
    const headers = [
        { title: "RIDER" },
        { title: "APPLIED ON" },
        { title: "STATUS" },
        { title: "ACTION" },
    ]
    const content = [
        { image: "/demo_profile.jpg", name: "Macrus Bennett", phone: "0197923421", email: "demo213@gmail.com", date: "12 aug 2025", status: "PENDING" },
        { image: "/demo_profile.jpg", name: "Macrus Bennett", phone: "0197923421", email: "demo213@gmail.com", date: "12 aug 2025", status: "PENDING" },
        { image: "/demo_profile.jpg", name: "Macrus Bennett", phone: "0197923421", email: "demo213@gmail.com", date: "12 aug 2025", status: "PENDING" },
        { image: "/demo_profile.jpg", name: "Macrus Bennett", phone: "0197923421", email: "demo213@gmail.com", date: "12 aug 2025", status: "PENDING" },
        { image: "/demo_profile.jpg", name: "Macrus Bennett", phone: "0197923421", email: "demo213@gmail.com", date: "12 aug 2025", status: "PENDING" },
        { image: "/demo_profile.jpg", name: "Macrus Bennett", phone: "0197923421", email: "demo213@gmail.com", date: "12 aug 2025", status: "PENDING" },
    ]
    const approveButton = () => {
console.log(`approved`)
    }
    const rejectButton = () => {
        console.log(`rejected`)
    }
    return (
        <div className=' bg-white p-4 my-8 '>
            <div className='grid grid-cols-12 gap-4 items-center'>
                {headers.map((item, index) => (
                    <p
                        key={index}
                        className={`
                ${index === 0 ? 'col-span-5' : ''}
                ${index === 1 ? 'col-span-2' : ''}
                ${index === 2 ? 'col-span-2' : ''}
                ${index === 3 ? 'col-span-3 text-right' : ''}
            `}
                    >
                        {item.title}
                    </p>
                ))}
            </div>
                {
                    content.map((item, index) => (
                        <div key={index} className='gap-4 grid grid-cols-12 items-center py-2'>
                            <div className='flex gap-2 items-center col-span-5'>
                                <Image
                                    src={item.image}
                                    width={500}
                                    height={500}
                                    alt={`profile image`}
                                    className='w-12 h-12 object-cover rounded-full'
                                />
                                <div>
                                    <p className='text-lg font-semibold'>{item.name}</p>
                                    <p className='text-base text-(--neutral)'>{item.email}</p>
                                </div>
                            </div>
                            <p className='text-(--neutral) grid col-span-2'>{item.date}</p>
                            <div className={'px-2 py-1 bg-green-100 col-span-1'}>{item.status}</div>
                            <div className='grid ml-auto col-span-4 place-items-center grid-cols-6'>
                                <button onClick={approveButton} className='text-white  border border-transparent bg-green-500 shadow-xs rounded-xl px-4 py-1 col-span-2 cursor-pointer'>Approve</button>
                                <button onClick={rejectButton} className='text-red-500 border-red-600 border px-4 py-1 rounded-xl col-span-2 cursor-pointer'>Reject</button>
                            </div>
                        </div>
                    ))
                }

        </div>
    )
}

export default RiderList