'use client'
import Image from 'next/image'

import { LuMailPlus } from "react-icons/lu";
import { MdCall } from "react-icons/md";
import { FaCar, FaChartBar } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
const Information = () => {

    const cards = [
        {title:"DRIVERS APPROVED", number:1204, icon:FaCar, bg:"green-100/50", color:"green-600"},
        {title:"RIDERS MANAGED", number:1200, icon:FaCar, bg:"bg-blue-100/50", color:"text-blue-600"},
        {title:"RIDES MONITORED", number:1509, icon:FaCar, bg:"bg-purple-100/50", color:"text-purple-600"},
        {title:"DRIVERS APPROVED", number:1204, icon:FaCar, bg:"bg-orange-100/50", color:"text-orange-600"},
    ]


    return (
        <div className='w-full bg-white p-4 flex items-center justify-between min-h-40'>
            <div className='flex items-center gap-4'>
                {/* 1st part */}
                <Image
                    src={'/demo_profile.jpg'}
                    width={500}
                    height={500}
                    alt='profile picture'
                    className='rounded-lg object-cover py-2 w-30 h-40'
                />
                {/* 2nd part */}
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2 items-center'>
                        <p className='text-2xl font-semibold'>Aminul Islam Sakib</p>

                        <p className='text-green-900 font-medium text-sm px-2 py-1 bg-(--primary)/20 rounded-full'>Admin</p>

                        <div className="px-2 flex items-center gap-2 bg-green-300/50 rounded-full">
                            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                            <p className='text-green-900'>Active</p>
                        </div>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <div className='flex items-center gap-2'>
                            <LuMailPlus />
                            <p className='text-(--neutral)'>sarah.jenkins@gmail.com</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <MdCall />
                            <p className='text-(--neutral)'>01796414761</p>
                        </div>

                    </div>
                </div>
            </div>
<button className='px-8 py-2 bg-green-900 text-white font-medium text-xl rounded-lg cursor-pointer hover:bg-green-800 transition duration-75'>Edit Profile</button>
        </div>
    )
}

export default Information