import RegisterForm from '@/app/_components/Forms/RegisterForm'
import React from 'react'

const Register = () => {
  return (
        <div className='min-h-screen py-12 w-full bg-zinc-900/10 flex flex-col items-center'>
      <div className='flex flex-col gap-2 items-center text-center'>
        <p className='text-4xl font-extrabold text-(--primary) text-shadow-2xs'>RideX</p>
        <p className='text-md text-gray-700'>Join the movement</p>
      </div>
      <RegisterForm/>
    </div>
  )
}

export default Register