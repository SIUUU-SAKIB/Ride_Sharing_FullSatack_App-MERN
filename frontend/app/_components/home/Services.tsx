'use client'

import { useQuery } from "@tanstack/react-query"
import { CarTaxiFront, Lock } from "lucide-react"
import Link from 'next/link'
import React from "react"
import { useState } from "react"
const Services = () => {
    const [clicked, setClicked] = React.useState(false)
    return (
        <div className="fixed bottom-30 bg-white max-screen-xl md:min-w-screen-xl mx-auto flex flex-col gap-4 items-center py-4 px-4 z-10 rounded-lg justify-center">
            <p className="text-2xl font-semibold text-black">Select Service</p>

            <div onClick={() => setClicked(false)} className={`p-2 rounded-xl flex gap-2 ${!clicked && "border-(--primary) bg-(--primary)/10 border"} cursor-pointer`}>
                <div className="flex gap-x-4 items-center justify-center w-full">
                    <CarTaxiFront size={50} className="text-(--primary) font-semibold  bg-white p-2 rounded-sm" />
                    <div className="flex flex-col items-start ">
                        <p className="text-lg font-semibold text-black">Ride Pro</p>
                        <p className="text-md text-gray-400">5 min away + All-Pro quality vehicles</p>
                    </div>
                </div>
            </div>

            <div onClick={() => setClicked(true)} className={`p-2 rounded-xl flex gap-2 ${clicked && "border-(--primary) bg-(--primary)/10 border"} cursor-pointer`}>

                <div className="flex gap-x-4 items-center justify-center">
                    <CarTaxiFront size={50} className="text-(--primary) font-semibold  bg-white p-2 rounded-sm" />
                    <div className="flex flex-col items-start">
                        <p className="text-lg font-semibold text-black">Ride Premium</p>
                        <p className="text-md text-gray-400">10 min away + All premium vehicles</p>
                    </div>
                </div>
            </div>

            <Link href={`/login`} className="text-lg bg-(--primary) px-16 py-4 rounded-2xl shadow-md text-white font-bold text-shadow-xs flex gap-2 cursor-pointer  mt-4">
                <Lock strokeWidth={3} />
                Log in to Reqeust Ride </Link>
        </div>
    )
}

export default Services