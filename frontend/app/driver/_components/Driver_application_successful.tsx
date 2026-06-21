import Link from 'next/link'
import React from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { FaArrowLeftLong } from 'react-icons/fa6'

const Driver_application_successful = () => {
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center gap-6 z-50 py-16 relative">
        <Link href={'/'} className='text-4xl font-semibold text-(--primary)'>RideX</Link>
        <div className='p-8 bg-white rounded-full'>
            <FaRegCheckCircle className='text-4xl text-(--primary) font-bold' />
        </div>
        <h1 className='text-2xl md:text-4xl font-bold text-center'>Application Submitted Sucessfully</h1>
        <p className='max-w-150 text-center text-(--neutral) text-base md:text-lg'>
            Your applicatoin is under review.<br/> We will notify you once it has been<br/> approved
        </p>
        <Link href={`/dashboard/rider`} className='w-2/3  bg-(--primary) rounded-lg shadow-xs py-2 font-semibold text-white  shadow-emerald-400 text-center text-lg '>Go to Dashboard</Link>
        <div className='flex gap-2 items-center'>
            <FaArrowLeftLong className='text-xl font-extralight'/>
            <Link href={'/'}>Back to Home</Link>
        </div>
        <div className='flex gap-2 items-center py-1 px-2 bg-(--primary)/20 rounded-full'>
            <div className='w-2 h-2 bg-(--primary) rounded-full'></div>
            <p className='uppercase text-(--primary) text-sm '>verification pending</p>
        </div>

    </div>
  )
}

export default Driver_application_successful