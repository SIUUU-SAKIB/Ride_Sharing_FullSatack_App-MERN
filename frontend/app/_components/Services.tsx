'use client'

import { CarTaxiFront } from "lucide-react"

const Services = () => {
    return (
        <div className="fixed bottom-16 bg-white flex flex-col gap-4 items-center py-6 px-4 z-10 rounded-lg mx-auto">
            <p className="text-2xl font-semibold text-black">Select Service</p>

            <div className="p-2 border border-(--primary) rounded-lg bg-(--primary)/10 flex gap-2">

                <div className="flex gap-x-4 items-center justify-center">
                    <CarTaxiFront size={50} className="text-(--primary) font-semibold  bg-white p-2 rounded-sm" />
                    <div className="flex flex-col items-start ">
                        <p className="text-lg font-semibold text-black">Ride Pro</p>
                        <p className="text-md text-gray-400">2 min away + All-Pro quality vehicles</p>
                    </div>
                </div>


                
            </div>

            <div className="p-2 border border-(--primary) rounded-lg bg-(--primary)/10 flex gap-2">

                <div className="flex gap-x-4 items-center justify-center">
                    <CarTaxiFront size={50} className="text-(--primary) font-semibold  bg-white p-2 rounded-sm" />
                    <div className="flex flex-col items-start ">
                        <p className="text-lg font-semibold text-black">Ride Pro</p>
                        <p className="text-md text-gray-400">2 min away + All-Pro quality vehicles</p>
                    </div>
                </div>


                
            </div>
        </div>
    )
}

export default Services