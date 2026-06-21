'use client'
import Image from 'next/image'
import { FaPen } from "react-icons/fa";

const Information = () => {
    return (
        <div className='w-full bg-white p-4 flex items-center justify-between min-h-40'>
            <div className='flex items-center gap-4'>
                {/* 1st part */}
  <Image
                    src={'/demo_profile.jpg'}
                    width={500}
                    height={500}
                    alt='profile picture'
                    className='rounded-lg object-cover py-2 w-30 h-40'
                />
                {/* 2nd part */}
                <div className='gap-4'>
                    <div className='flex gap-2 items-center'>
                        <p className='text-xl font-semibold'>Aminul Islam Sakib</p>
                        
                        <p className='text-green-700 font-medium text-sm px-2 py-1 bg-(--primary)/10 rounded-full'>Admin</p>
                      

                    </div>
                </div>
            </div>
              
        </div>
    )
}

export default Information