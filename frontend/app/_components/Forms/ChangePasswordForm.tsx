"use client"
import { Authentication } from '@/app/_services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CiUnlock } from 'react-icons/ci'
import { FaLaptopCode } from 'react-icons/fa'
import { toast } from 'sonner'
import { z } from "zod"
const Inputs = z.object({
    otp: z.string({ message: "OTP is required" }).min(6, { message: "OTP must require 6 digits" }),
    changePassword: z.string({ message: "Password is required" }).min(8, { message: "Password requires at least 8 character" }),
    confirmPassword: z.string({ message: "Confirm Password is required" }).min(8, { message: "Confirmed Password requires at least 8 character" })
}).refine((data) => data.changePassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})
type FormFields = z.infer<typeof Inputs>

const ChangePasswordForm = () => {
    const router = useRouter()
    const { register, handleSubmit, setError, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(Inputs)
    })
    const mutaion = useMutation({
        mutationFn: Authentication.verifyOtp
    })


    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const payload = {
                otp: data.otp,
                newPassword: data.changePassword
            }
            const response = await mutaion.mutateAsync(payload)
            console.log(response)
            toast.success(`Successfully changed the password.`)
            router.push(`/login`)
            console.log(payload)
        } catch (error) {
            console.log(error)
            setError('root', {
                message:
                    error instanceof Error
                        ? error.message
                        : typeof error === "string"
                            ? error
                            : "Something went wrong"
            })
        }
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
                    {
                        errors.otp && <p className='text-red-500 font-semibold'>{errors.otp.message}</p>
                    }

                </div>

                <div className='flex w-full flex-col gap-2 space-x-4'>
                    <label className='text-sm text-(--neutral)'>Change Password</label>
                    <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg'>
                        <CiUnlock className='text-(--neutral) text-xl' />
                        <input {...register('changePassword')} type='text' className='outline-none border-none text-(--neutral) focus:text-(--primary) text:md md:text-lg flex-1' placeholder='Min. 8 Character'

                        />

                    </div>
                    {
                        errors.changePassword && <p className='text-red-500 font-semibold'>{errors.changePassword.message}</p>
                    }

                </div>
                <div className='flex w-full flex-col gap-2 space-x-4'>
                    <label className='text-sm text-(--neutral)'>Confirm new password</label>
                    <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg'>
                        <CiUnlock className='text-(--neutral) text-xl' />
                        <input {...register('confirmPassword')} type='text' className='outline-none border-none text-(--neutral) focus:text-(--primary) text:md md:text-lg flex-1' placeholder='Repeat new password'

                        />

                    </div>
                    {
                        errors.confirmPassword && <p className='text-red-500 font-semibold'>{errors.confirmPassword.message}</p>
                    }

                </div>
            </div>
            <button
                type='submit'
                className='w-full bg-(--primary) rounded-xl py-4 md:py-4 text-white text-shadow-xs text-lg md:text-xl font-bold my-4 cursor-pointer hover:bg-(--primary)/90 flex items-center justify-center mt-8'
            >
                Update Password
            </button>
            {errors.root && <p className='text-red-500 font-semibold'>{errors.root.message}</p>}
        </form>
    )
}

export default ChangePasswordForm