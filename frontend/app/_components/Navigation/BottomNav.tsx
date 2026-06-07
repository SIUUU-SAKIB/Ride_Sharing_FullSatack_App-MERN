"use client"
import { useCurrentUser } from '@/app/_hooks/useCurrentUser'
import { useLogout } from '@/app/_hooks/useLogout'
import { HousePlus, SquareActivity, User, Wallet } from 'lucide-react'
import Link from 'next/link'
import { MdDashboard, MdLogout } from 'react-icons/md'
const BottomNav = () => {
    const { data: session } = useCurrentUser()
   const logoutMutation = useLogout()
    return (
        <div className='fixed bottom-0 left-0 w-full bg-white mx-auto z-50 '>
            <ul className='flex items-center justify-between py-4 text-gray-400 px-12 max-w-7xl mx-auto'>
                <li>     <Link href={`/`} className='text-xl cursor-pointer flex flex-col gap-1 items-center'>
                    <HousePlus />
                    <p className='text-gray-700  text-sm'>Home</p>
                </Link></li>
                {/* session === false */}
                {
                    !session && <><li>  <Link href={`#`} className='text-xl cursor-pointer flex flex-col gap-1 items-center'>
                        <SquareActivity />
                        <p className='text-gray-700 text-sm'>Services</p>
                    </Link></li>

                        <li>  <Link href={`#`} className='text-xl cursor-pointer flex flex-col gap-1 items-center'>
                            <Wallet />
                            <p className='text-gray-700  text-sm'>Activity</p>
                        </Link></li>
                    </>
                }
                {/* session === true */}
                {
                    session && <>
                        <li>  <Link href={`/user/profile`} className='text-xl cursor-pointer flex flex-col gap-1 items-center'>
                            <User />
                            <p className='text-gray-700  text-sm'>Profile</p>
                        </Link></li>
                         <li>  <Link href={`/user/profile`} className='text-xl cursor-pointer flex flex-col gap-1 items-center'>
                          <MdDashboard/>
                            <p className='text-gray-700  text-sm'>Dashboard</p>
                        </Link></li>
                        <li onClick={() => logoutMutation.mutate()} className='text-xl cursor-pointer flex flex-col gap-1 items-center' >
                            <MdLogout className='transform rotate-180' />
                            <p className='text-gray-700  text-sm'>Logout</p>
                            
                        </li>
                        
                    </>
                }
            </ul>
        </div>
    )
}

export default BottomNav