'use client'
import { Lock, Mail, Smartphone, User } from 'lucide-react'
import React from 'react'


const RegisterForm = () => {
  return (
    <div className='mx-auto bg-white mt-4 rounded-2xl max-w-[500px]'>
      <form className='flex max-w-150 flex-col gap-6 items-start justify-center px-4  py-6'>
        {/* name */}
        <div className='flex flex-col w-full gap-2 space-x-4'>
          <label className='text-sm text-(--neutral)'>Full Name</label>
          <div className='flex gap-2 space-x-6 items-center px-2 py-2 bg-(--neutral)/10 rounded-lg'>
            <User className='text-(--neutral)' />
            <input type='text' className='outline-none border-none text-(--neutral)' placeholder='John Doe' />
          </div>
        </div>


        {/* email */}
        <div className='flex flex-col gap-2 space-x-4'>
          <label className='text-sm text-(--neutral)'>Email address</label>
          <div className='flex gap-2 space-x-6 items-center px-2 py-2 bg-(--neutral)/10 rounded-lg'>
            <Mail className='text-(--neutral)' />
            <input type='email' className='outline-none border-none text-(--neutral)' placeholder='John123@gmail.com' />
          </div>
        </div>

        {/* Phone number*/}
        <div className='flex flex-col gap-2 space-x-4'>
          <label className='text-sm text-(--neutral)'>Phone Number</label>
          <div className='flex space-x-6 items-center px-2 py-2 bg-(--neutral)/10 rounded-lg'>
            <Smartphone className='text-(--neutral)' />
            <input type='text' className='outline-none border-none text-(--neutral)' placeholder='John Doe' />
          </div>
        </div>

        {/*password*/}
        <div className='flex flex-col w-full gap-2 space-x-4'>
          <label className='text-sm text-(--neutral)'>Password</label>
          <div className='flex gap-2 space-x-6 items-center px-2 py-2 bg-(--neutral)/10 rounded-lg'>
            <Lock className='text-(--neutral)' />
            <input type='text' className='outline-none border-none text-(--neutral)' placeholder='*******' />
          </div>
        </div>
        <div className='flex gap-1 w-full bg-(--neutral)/10 p-1 rounded-xl'>
          <div className='w-1/2 bg-white p-1 rounded-md flex gap-1 items-center'>
            <User className='text-(--primary) text-sm' />
            <p className='text-sm text-(--neutral)'>Rider</p>
          </div>

          <div className='w-1/2 bg-white rounded-xl flex items-center gap-1'>
            <User className='text-(--primary) text-sm' />
            <p className='text-sm text-(--neutral)'>Rider</p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm