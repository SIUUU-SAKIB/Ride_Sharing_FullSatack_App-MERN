"use client"
import { Search } from 'lucide-react'
import React from 'react'
import SearchResult from './DriverList'
import { MdFilterAltOff } from 'react-icons/md'

const DriverFilters = () => {
    const [search, setSearch] =  React.useState<string>('')
    const [status, setStatus] = React.useState<string>('')
    return (
        <div className='py-4'>
            <div className='p-4 flex items-center justify-between bg-white'>
                {/* serarch driver */}
                <div className='flex-1 pr-8 pl-2' >
                    <p className='text-(--neutral)'>Search Driver</p>
                    <div className='flex gap-2 bg-zinc-100 rounded-md p-2'>
                        <Search className='text-(--neutral) text-xs' />
                        <input 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                         type='text' placeholder='License or phone or vehicle number'
                            className='flex-1 border-none outline-none w-full text-sm'
                        />
                    </div>
                </div>
                {/* status */}
                <div className='px-8'>
                    <p className='text-(--neutral)'>Status</p>
                    <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                     className='outline-none border-none shadow-xs px-4 py-2 pr-6 bg-zinc-100' 
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
             
                {/* clear filters */}
               <div onClick={() => {
                              setSearch(''),
                                  setStatus('ALL STATUS')
                          }} className="flex justify-self-center gap-1 items-center col-span-1 mt-auto self-center cursor-pointer mb-2" >
                              <MdFilterAltOff className="text-xl text-red-500" />
                              <p className="texxt-red-500 font-medium text-red-500">Clear Filters</p>
                          </div>
            </div>
            <SearchResult search={search} status= {status}/>
        </div>
    )
}

export default DriverFilters