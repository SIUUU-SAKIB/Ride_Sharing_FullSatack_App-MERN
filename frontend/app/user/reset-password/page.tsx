import ChangePasswordForm from '@/app/_components/Forms/ChangePasswordForm'
import React from 'react'
import { MdOutlineLockReset } from 'react-icons/md'

const ResetPassword = () => {
  return (
    <div className='w-full max-w-5xl shadow-sm flex flex-col items-center gap-8 min-h-screen bg-zinc-200/10 mx-auto'>
      {/* top container */}
      <div className='flex flex-col gap-4 items-center justify-center mt-16' >
        <div className='  rounded-full p-4 bg-(--primary)/10'><MdOutlineLockReset className='text-4xl z-50 text-(--primary)' /></div>
        <div className='mt-4'>
          <h2 className='text-center text-2xl font-semibold text-black'>Secure Your Account</h2>
        <p className='max-w-100 text-center text-(--neutral) mt-2'>Enter OTP send to your email and your new password to secure your account, OTP wil expire in 10 minute.</p>
        </div>
      </div>
      <ChangePasswordForm/>
    </div>
  )
}

export default ResetPassword