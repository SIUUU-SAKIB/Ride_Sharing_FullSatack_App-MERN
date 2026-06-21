'use client'
import Image from 'next/image'
import { FaPen } from "react-icons/fa";

const Information = () => {
    return (
        <div className='w-full bg-white p-4 flex items-center justify-between min-h-40'>
            <div className='relative'>
                <Image
                    src={'/demo_profile.jpg'}
                    width={500}
                    height={500}
                    alt='profile picture'
                    className='rounded-lg object-cover py-2 w-30 h-40'
                />
               <div className='p-2 rounded-lg bg-green-600  absolute right-0 bottom-0 cursor-pointer'>
                <FaPen className='text-white text-md font-light'/>
               </div>
            </div>

        </div>
    )
}

export default Information