"use client"
import { Search } from 'lucide-react'
import React, { useState } from 'react'

const DriverFilters = () => {
    const [searchDriver, setSerchDriver] =  React.useState<string>('')
    const [status, setStatus] = React.useState<string>('')
    const [vehicleType, setVehicleType] = React.useState<string>('')
console.log(searchDriver, status, vehicleType)
    return (
        <div className='py-4'>
            <div className='p-4 flex items-center justify-between bg-white'>
                {/* serarch driver */}
                <div>
                    <p className='text-(--neutral)'>Search Driver</p>
                    <div className='flex gap-2 bg-zinc-100 rounded-md p-2'>
                        <Search className='text-(--neutral) text-xs' />
                        <input 
                        value={searchDriver}
                        onChange={(e) => setSerchDriver(e.target.value)}
                         type='text' placeholder='Name, Email, or Phone'
                            className='flex-1 border-none outline-none w-full text-sm'
                        />
                    </div>
                </div>
                {/* status */}
                <div>
                    <p className='text-(--neutral)'>Status</p>
                    <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                     className='outline-none border-none shadow-xs px-4 py-2 pr-6 bg-zinc-100' 
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                </div>
                {/* vehicle type */}
                 <div>
                    <p className='text-(--neutral)'>Vehicle type</p>
                    <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                     className='outline-none border-none shadow-xs px-4 py-2 pr-6 bg-zinc-100' 
                    >
                        <option value="ALL">All Types</option>
                        <option value="PENDING">Two Wheeler</option>
                        <option value="APPROVED">Three Wheeler</option>
                        <option value="REJECTED">Four Wheeler</option>
                    </select>
                </div>
                {/* clear filters */}
                <button className='px-4 py-2 bg-(--primary)/20 text-(--primary) rounded-lg mt-4 cursor-pointer hover:bg-(--primary)/10 transition duration-200'>Clear filters</button>
            </div>
        </div>
    )
}

export default DriverFilters