"use client"
import React, { useEffect, useState } from "react";
import { MdFilterAltOff } from "react-icons/md";
const RiderFilters = () => {
    const [search, setSearch] = React.useState<string>('')
    const [status, setStatus] = React.useState<string>('')

    console.log(search, status)
    return (
        <div className='pt-8 px-4 pb-4 bg-white rounded-sm grid grid-cols-7 items-center gap-4'>
            <div className='grid col-span-4'>
                <label className='text-gray-800'>Search Rider</label>
                <input onChange={e => setSearch(e.target.value)} value={search} placeholder='Name, Email or phone' className='border-none outline-none p-2 shadow-xs bg-zinc-100 rounded-md' />
            </div>
            <div className="grid col-span-2">
                <p className='text-gray-800'>Status</p>
                <select onChange={e => setStatus(e.target.value)} value={status}
                    className='outline-none border-none shadow-xs px-4 py-2 pr-6 bg-zinc-100 rounded-md text-(--neutral)'
                >
                    <option value="ALL">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                </select>
            </div>
            <div onClick={() => {
                setSearch(''), setStatus('')
            }} className="flex justify-self-center gap-1 items-center col-span-1 mt-auto self-center cursor-pointer mb-2" >
                <MdFilterAltOff className="text-xl text-red-500" />
                <p className="texxt-red-500 font-medium text-red-500">Clear Filters</p>
            </div>
        </div>
    )
}

export default RiderFilters