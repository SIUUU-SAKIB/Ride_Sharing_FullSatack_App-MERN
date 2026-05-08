"use client"
import { HousePlus, Link, SquareActivity, Wallet } from 'lucide-react'

const BottomNav = () => {
    return (
        <div className='fixed bottom-0 w-full bg-white mx-auto'>
            <ul className='flex items-center justify-between bg-white shadow-sm py-8 text-gray-400 px-12 max-w-7xl mx-auto z-10'>
                <Link className='text-xl cursor-pointer flex flex-col gap-2'>
                    <HousePlus />
                    {/* <p className='text-black text-xl'>Home</p> */}
                </Link>
                <Link className='text-xl cursor-pointer flex flex-col gap-2'><SquareActivity />
                    <p className='text-red-600 text-xl'>Home</p>
                </Link>
                <Link className='text-xl cursor-pointer flex flex-col gap-2'><Wallet />
                    <p className='text-red-600 text-xl'>Home</p>
                </Link>
            </ul>
        </div>
    )
}

export default BottomNav