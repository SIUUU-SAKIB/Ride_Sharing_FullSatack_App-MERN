"use client"
import { HousePlus, SquareActivity, Wallet } from 'lucide-react'
import Link from 'next/link'
const BottomNav = () => {
    return (
        <div className='fixed bottom-0 w-full bg-white mx-auto'>
            <ul className='flex items-center justify-between bg-white shadow-sm py-4 text-gray-400 px-12 max-w-7xl mx-auto z-10'>
                <Link href={`/`} className='text-xl cursor-pointer flex flex-col gap-1 items-center'>
                    <HousePlus />
                    <p className='text-gray-700  text-sm'>Home</p>
                </Link>
                <Link href={`#`} className='text-xl cursor-pointer flex flex-col gap-1 items-center'>
                    <SquareActivity />
                    <p className='text-gray-700 text-sm'>Services</p>
                </Link>
                <Link href={`#`} className='text-xl cursor-pointer flex flex-col gap-1 items-center'>
                    <Wallet />
                    <p className='text-gray-700  text-sm'>Activity</p>
                </Link>
            </ul>
        </div>
    )
}

export default BottomNav