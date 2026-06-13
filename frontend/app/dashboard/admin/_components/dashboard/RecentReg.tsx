import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RecentReg = () => {
    const userInfo = [
        {
            id:1, image:"/demo_profile.jpg", name:"Emily watson", time:"20 minutes ago", role:"Rider", email:"emily123@gmail.com"
        },
        {
            id:2, image:"/demo_profile.jpg", name:"Emily watson", time:"20 minutes ago", role:"Rider", email:"emily123@gmail.com"
        },
        {
            id:3, image:"/demo_profile.jpg", name:"Emily watson", time:"20 minutes ago", role:"Rider", email:"emily123@gmail.com"
        },
        {
            id:4, image:"/demo_profile.jpg", name:"Emily watson", time:"20 minutes ago", role:"Rider", email:"emily123@gmail.com"
        },
    ]
  return (
    <div className='w-full h-full rounded-lg grid col-span-2 bg-white'>
        <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between p-4'>
            <p className='text-2xl font-bold'>Recent Registrations</p>
            <Link href={'/'} className='text-md text-(--neutral)'>view all</Link>
        </div>
        <div className='h-[.3px] w-full bg-(--neutral)'></div>
        {
            userInfo.map(user => (
                <div key={user.id} className='flex gap-4 items-center justify-between px-4 pb-4'>
                    <div className='flex gap-4 items-center'>
                        
                        <Image
                        src={user.image}
                        alt='user image'
                        height='500'
                        width={'500'}
                        className='object-cover h-12 w-12 rounded-full'
                        />
                        <div>
                            <p className='text-lg font-medium'>{user.name}</p>
                            <p className='text-md text-(--neutral)'>{user.email}</p>
                        </div>
                    </div>
                    {/* 2nd part */}
                    <div className='flex flex-col gap-1'>
                        <p className='text-sm text-(--neutral)'>{user.time}</p>
                        <p className='text-sm text-(--primary)'>{user.role}</p>
                       
                    </div>
                    
                    
                </div>
                
            
            ))
        }
        </div>
    </div>
  )
}

export default RecentReg;
