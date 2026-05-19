import ForgotPasswordForm from '@/app/_components/Forms/ForgotPasswordForm'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ForgotPassword = () => {
    return (
        <div className='max-w-7xl mx-auto flex flex-col pt-12 gap-8 items-center bg-zinc-100/80 min-h-screen'>
            <Link href={'/'} className={`text-4xl md:text-2xl text-(--primary) font-bold md:font-extrabold lg:text-4xl mt-2`}>RideX</Link>
            <div className='max-w-125 mx-auto bg-white p-4 flex flex-col items-start gap-2.5 px-8 py-20  h-full'>
                <Link href={`/login`} className='flex gap-2 items-center'> <MoveLeft className='text-(--neutral)' />
                    <p className='text-sm md:text-md lg:text-lg text-(--neutral)'>Back to Login</p></Link>
                <h1 className='text-black font-bold text-xl'>Forgot Password</h1>
                <p className='text-sm md:text-md lg:text-lg text-(--neutral) '> Enter your email address and we'll send you a recovery code<br></br> to reset your password. </p>
                <div className='flex gap-2 w-full flex-col items-start pt-8'>
                    <p className='text-sm md:text-md lg:text-lg text-(--neutral)'>Email Address</p>
                    <ForgotPasswordForm/>
                </div>
            </div>
            {/* email form */}
        </div>
    )
}

export default ForgotPassword