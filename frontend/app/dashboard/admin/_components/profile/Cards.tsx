import React from 'react'
import { LuMailPlus } from "react-icons/lu";
import { MdCall } from "react-icons/md";
import { FaCar, FaChartBar } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
const Cards = () => {
        const cards = [
            { title: "DRIVERS APPROVED", number: 1204, icon: FaCar, bg: "green-200/50", color: "green-600" },
            { title: "RIDERS MANAGED", number: 1200, icon: FaCar, bg: "blue-200/50", color: "blue-600" },
            { title: "RIDES MONITORED", number: 1509, icon: FaCar, bg: "purple-200/50", color: "purple-600" },
            { title: "JOINED DATE", number: '12 August 2025', icon: SlCalender, bg: "orange-200/50", color: "orange-600" },
        ]
  return (
    <div className='w-full flex items-center justify-between gap-4 my-4'>
        {
            cards.map(({title, number, icon: Icon, bg, color}) => (
                <div className='flex flex-col gap-4 bg-white rounded-lg items-start p-4 w-full shadow-md' key={title}>
                    <div className={`bg-${bg} p-3 rounded-full`}>
                        {Icon && <Icon className={`text-${color} text-2xl`} />}
                    </div>
                    <p className='text-sm font-medium text-gray-700'>{title}</p>
                    <p className='text-2xl font-extrabold'>{number}</p>
                
                </div>
            ))
        }
    </div>
  )
}

export default Cards