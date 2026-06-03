import { User } from 'lucide-react'
import React from 'react'

const DriverRegistrationForm = () => {
  return (
    <form className='max-w-5xl mx-auto gap-4 items-start px-4 bg-white rounded-lg'>
        <div className='flex items-center gap-2'>
            <User className='text-lg text-(--primary)'/>
        <p className='text-lg md:text-xl xl:text-2xl text-black/90'>Driver Information</p>
        </div>
    </form>
  )
}

export default DriverRegistrationForm