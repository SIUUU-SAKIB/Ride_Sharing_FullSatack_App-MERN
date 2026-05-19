"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CiUnlock } from 'react-icons/ci'
import { FaLaptopCode } from 'react-icons/fa'
import { z } from "zod"
const Inputs = z.object({
    otp: z.number({ message: "OTP is required" }).min(6, { message: "OTP must require 6 digits" }),
    changePassword: z.string({ message: "Password is required" }).min(8, { message: "Password requires at least 8 character" }),
    confirmPassword: z.string({ message: "Confirm Password is required" }).min(8, { message: "Confirmed Password requires at least 8 character" })
})
type FormFields = z.infer<typeof Inputs>

const ChangePasswordForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(Inputs)
    })

    const onSubmit: SubmitHandler<FormFields> = (data) => {

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-110 sm:w-125 md:w-150 lg:w-175 bg-white mt-4 rounded-2xl '>
            <div className='flex w-full flex-col gap-6'>
                <div className='flex w-full flex-col gap-2 space-x-4 '>
                    <label className='text-sm text-(--neutral)'>OTP Code</label>
                    <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg'>
                        <FaLaptopCode className='text-(--neutral) text-xl' />
                        <input {...register('otp')} type='text' className='outline-none border-none text-(--neutral) focus:text-(--primary) text:md md:text-lg flex-1' placeholder='Enter 6-digit code'

                        />
                    </div>

                </div>

                <div className='flex w-full flex-col gap-2 space-x-4'>
                    <label {...register('changePassword')} className='text-sm text-(--neutral)'>Change Password</label>
                    <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg'>
                        <CiUnlock className='text-(--neutral) text-xl' />
                        <input type='text' className='outline-none border-none text-(--neutral) focus:text-(--primary) text:md md:text-lg flex-1' placeholder='Min. 8 Character'

                        />
                    </div>

                </div>
                <div className='flex w-full flex-col gap-2 space-x-4'>
                    <label className='text-sm text-(--neutral)'>Ccnfirm new password</label>
                    <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg'>
                        <CiUnlock className='text-(--neutral) text-xl' />
                        <input {...register('confirmPassword')} type='text' className='outline-none border-none text-(--neutral) focus:text-(--primary) text:md md:text-lg flex-1' placeholder='Repeat new password'

                        />
                    </div>

                </div>
            </div>
            <button
                type='submit'
                className='w-full bg-(--primary) rounded-xl py-4 md:py-4 text-white text-shadow-xs text-lg md:text-xl font-bold my-4 cursor-pointer hover:bg-(--primary)/90 flex items-center justify-center mt-8'
            >
                Update Password
            </button>
        </form>
    )
}

export default ChangePasswordForm