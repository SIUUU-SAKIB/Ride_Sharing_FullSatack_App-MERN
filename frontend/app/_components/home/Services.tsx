'use client'
import { CarTaxiFront, Lock } from "lucide-react"
import Link from 'next/link'
import React from "react"
const Services = () => {
    const [clicked, setClicked] = React.useState(false)
    return (
        <div className="flex items-center w-full flex-col gap-2 bg-white px-4 py-4 rounded-lg">
            <p className="text-2xl font-semibold text-black">Select Service</p>

            <div onClick={() => setClicked(false)} className={`p-2 rounded-xl flex gap-2 ${!clicked && "border-(--primary) bg-(--primary)/10 border"} cursor-pointer w-full`}>
                <div className="flex gap-x-4 items-center justify-center">
                    <CarTaxiFront size={50} className="text-(--primary) font-semibold  bg-white p-2 rounded-sm" />
                    <div className="flex flex-col items-start ">
                        <p className="text-lg font-semibold text-black">Ride Pro</p>
                        <p className="text-md text-gray-400">5 min away + All-Pro quality vehicles</p>
                    </div>
                </div>
            </div>

            <div onClick={() => setClicked(true)} className={`p-2 rounded-xl flex gap-2 ${clicked && "border-(--primary) bg-(--primary)/10 border"} w-full cursor-pointer`}>

                <div className="flex gap-x-4 items-center justify-center">
                    <CarTaxiFront size={50} className="text-(--primary) font-semibold  bg-white p-2 rounded-sm" />
                    <div className="flex flex-col items-start">
                        <p className="text-lg font-semibold text-black">Ride Premium</p>
                        <p className="text-md text-gray-400">10 min away + All premium vehicles</p>
                    </div>
                </div>
            </div>

           <Link href={`/login`} className="text-lg bg-(--primary) px-16 py-4 rounded-2xl shadow-md text-white font-bold text-shadow-xs flex gap-2 cursor-pointer text-center mt-4 w-full items-center justify-center">
                <Lock strokeWidth={3} />
           <p>Log in to Reqeust Ride</p>
                 </Link>
        </div>
    )
}

export default Services