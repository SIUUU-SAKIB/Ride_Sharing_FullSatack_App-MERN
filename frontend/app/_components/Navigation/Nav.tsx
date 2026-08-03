'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Bell } from "lucide-react"

import { useCurrentUser } from '@/app/_hooks/useCurrentUser'
import LoadingScreen from '../ui/LoadingScreen'

const Nav = () => {
    const { data, isLoading, isError } = useCurrentUser()
    
    const profileImage = data?.data?.profilePhoto
    const session = data ? true : false
    if(isLoading) {
        return<LoadingScreen/>
    }
    return (
        <div className={`min-w-screen-2xl ${data ? "bg-white/20" : "bg-white"} h-14 px-4 md:px-12 py-8 md:py-8 flex items-center justify-between shadow-xs z-20`}>
            {/* logo container */}
            <div className='flex gap-2 py-2 items-center justify-center text-black '>
                <div className='flex gap-2 items-center'>
                    {
                    session ? (<Link href='user/profile'>
                        <Image
                            src={profileImage ? profileImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRBqTeY-dTImnv-0qS4j32of8dVtWelSEMw&s"}
                            alt='User profile image'
                            width={500}
                            height={500}
                            className={`${session ? "w-8 h-8 rounded-full object-cover" : "w-7 h-7"} md:w-10 md:h-10 lg:w-12 lg:h-12 object-cover`}
                        /></Link>) : (<Link href='/'>
                            <Image
                                src={"/car.png"}
                                alt='RideShare Logo'
                                width={500}
                                height={500}
                                className={`object-contain w-7 h-7  md:w-9 md:h-10 lg:w-12 lg:h-12`}
                            /></Link>)
                }
                {/* <p className='text-black text-sm md:text:md lg:text:lg font-semibold'>{data?.data?.name.split(" ").at(-1)}</p> */}
                </div>
                <Link href={'/'} className={`text-2xl text-black font-extraBold md:font-extrabold lg:text-4xl ${session ? "hidden" : "block"} mt-2`}>RideX</Link>
            </div>
            <Link href={'/'} className={`text-xl text-(--primary) : "text-black"} font-bold md:text-2xl md:font-extrabold lg:text-4xl ${session ? "block" : "hidden"}`}>RideX</Link>
            {/* navigation links */}
            {
                !session ? (<div className='flex gap-4 py-1 px-2 items-center justify-center'>
                    <Link href={'/login'} className='text-black text-sm md:text-md lg:text-lg hover:text-(--primary) hover:font-medium transition duration-300 px-4 py-1 rounded-full border border-(--primary)'>
                        Login
                    </Link>
                    <Link
                        href={'/register'}
                        className='text-black text-sm md:text-md lg:text-lg hover:font-medium transition duration-300 hover:bg-(--primary) hover:text-white px-2 py-1 rounded-full border border-(--primary)'
                    >
                        Sign Up
                    </Link>
                </div>) : (
                    <div>
                        <Bell className='text-(--primary) cursor-pointer"' />
                    </div>
                )
            }
        </div >
    )
}

export default Nav