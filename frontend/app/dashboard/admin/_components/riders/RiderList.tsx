'use client'
import LoadingScreen from '@/app/_components/ui/LoadingScreen'
import { AdminHooks } from '@/app/_hooks/dashboard/admin/rider'
import { ChevronLeft, ChevronRight, MoveLeft } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { FaLeftLong, FaRightLong } from "react-icons/fa6";
type IRideList = {
    search: string,
    status: string
}


const headers = [
    { title: "RIDER" },
    { title: "APPLIED ON" },
    { title: "STATUS" },
    { title: "ACTION" },
]
const content = [
    { image: null, name: "Macrus Bennett", phone: "0197923421", email: "demo213@gmail.com", date: "12 aug 2025", status: "APPROVED" },
    { image: "/demo_profile.jpg", name: "Macrus Bennett", phone: "0197923421", email: "demo213@gmail.com", date: "12 aug 2025", status: "PENDING" },
    { image: "/demo_profile.jpg", name: "Macrus Bennett", phone: "0197923421", email: "demo213@gmail.com", date: "12 aug 2025", status: "PENDING" },
    { image: "/demo_profile.jpg", name: "Macrus Bennett", phone: "0197923421", email: "demo213@gmail.com", date: "12 aug 2025", status: "APPROVED" },
    { image: undefined, name: "Angelique lapiedra", phone: "0197923421", email: "demo213@gmail.com", date: "12 aug 2025", status: "PENDING" },
    { image: "/demo_profile.jpg", name: "Macrus Bennett", phone: "0197923421", email: "demo213@gmail.com", date: "12 aug 2025", status: "REJECTED" },
]


const RiderList = ({ search, status }: IRideList) => {
    const { data, isLoading, isError } = AdminHooks.getAllUsers(1, 5)
    console.log(data?.meta?.total)
    const [page, setPage] = React.useState<number>(1)
    const [limit, setLimit] = React.useState<number>(5)




    if (isLoading) {
        return <LoadingScreen />
    }
    if (isError) {
        return <p className='text-red-500 font-bold text-4xl h-full text-center my-auto'>SOMETHING BAD HAPPEND</p>
    }
    const printName = (name: string) => {
        return name.split(' ').map(e => e[0].toUpperCase()).join("")
    }
    const approveButton = () => {
        alert(`approved`)
    }
    const rejectButton = () => {
        alert(`rejected`)
    }
    return (
        <div className=' bg-white p-4 my-8 '>
            <div className='grid grid-cols-12 gap-4 items-center py-4'>
                {headers.map((item, index) => (
                    <p
                        key={index}
                        className={`
                ${index === 0 ? 'col-span-5' : ''}
                ${index === 1 ? 'col-span-2' : ''}
                ${index === 2 ? 'col-span-2' : ''}
                ${index === 3 ? 'col-span-3 text-right' : ''}
            font-medium text-md`}
                    >
                        {item.title}
                    </p>
                ))}
            </div>
            {
                content.map((item, index) => (
                    <div key={index} className={`gap-4 grid grid-cols-12 items-center py-4 ${index !== content.length - 1 ? "border-b border-zinc-100" : ""}`}>
                        <div className='flex gap-2 items-center col-span-5'>
                            {item.image ? (
                                <Image
                                    src={item.image}
                                    width={500}
                                    height={500}
                                    alt="Profile image"
                                    className="w-12 h-12 object-cover rounded-full"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center font-semibold text-green-700">
                                    {printName(item.name)}
                                </div>
                            )}
                            <div>
                                <p className='text-lg font-semibold'>{item.name}</p>
                                <p className='text-base text-(--neutral)'>{item.email}</p>
                            </div>
                        </div>
                        <p className='text-(--neutral) grid col-span-2'>{item.date}</p>
                        <div className={`${item.status === `PENDING` && "bg-yellow-100 text-yellow-800" || item.status === "REJECTED" && "bg-red-100 text-red-800" || item.status === "APPROVED" && "bg-green-100 text-green-800"} grid place-content-center py-1 rounded-full`}><p className='text-xs font-medium'>{item.status}</p></div>
                        <div className='grid ml-auto col-span-4 place-items-center grid-cols-6'>
                            <button onClick={approveButton} className='text-white  border border-transparent bg-green-500 shadow-xs rounded-xl px-4 py-1 col-span-2 cursor-pointer hover:bg-green-600 transition duration-150 font-medium'>Approve</button>
                            <button onClick={rejectButton} className='text-red-500 border-red-600 border px-4 py-1 rounded-xl col-span-2 cursor-pointer hover:bg-red-500 transition duration-150 hover:text-white font-medium'>Reject</button>
                        </div>
                    </div>
                ))
            }
            <div className='w-full px-2 py-4 flex items-center justify-between'>
                <p className='text-sm'>Showing {limit} of {data.meta.total} entries</p>
                {/* PAGINATION */}
                <div className='flex items-center'>
                    <ChevronLeft onClick={() => {
                        if (page === 1) return
                        setPage((prev) => prev - 1)
                    }} strokeWidth={1} className={`cursor-pointer ${page === 1
                        ? "opacity-40 pointer-events-none"
                        : "cursor-pointer"
                        }`} />
                    <button
                        onClick={() => setPage(1)}
                        className={`p-2 border transition duration-100 cursor-pointer ${page === 1
                            ? "bg-(--primary) text-white border-(--primary)"
                            : "hover:bg-gray-100 border-gray-200"
                            }`}
                    >
                        1
                    </button>
                    <button
                        onClick={() => setPage(2)}
                        className={`p-2 border transition duration-100 cursor-pointer ${page === 2
                            ? "bg-(--primary) text-white border-(--primary)"
                            : "hover:bg-gray-100 border-gray-200"
                            }`}
                    >
                        2
                    </button>
                    <button
                        onClick={() => setPage(3)}
                        className={`p-2 border transition duration-100 cursor-pointer ${page === 3
                                ? "bg-(--primary) text-white border-(--primary)"
                                : "hover:bg-gray-100 border-gray-200"
                            }`}
                    >
                        3
                    </button>
                    <div className='text-center h-full my-auto text-gray-400 px-2'>...</div>
                <button
                        onClick={() => setPage(data?.meta?.totalPage)}
                        className={`p-2 border transition duration-100 cursor-pointer ${page === 3
                                ? "bg-(--primary) text-white border-(--primary)"
                                : "hover:bg-gray-100 border-gray-200"
                            }`}
                    >
                        {data?.meta?.totalPage}
                    </button>
                    <ChevronRight onClick={() => {
                        if (page === data?.meta?.totalPage) return
                        setPage((prev) => prev + 1)
                    }} strokeWidth={1} className={`cursor-pointer ${page === data?.meta?.totalPage
                        ? "opacity-40 pointer-events-none"
                        : "cursor-pointer"
                        }`} />
                </div>
            </div>
        </div>
    )
}

export default RiderList