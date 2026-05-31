"use client"
import { Authentication } from '@/app/_services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CiUnlock } from 'react-icons/ci'
import { FaLaptopCode } from 'react-icons/fa'
import { Eye, EyeOff } from 'lucide-react'
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

const getStrength = (password: string): { label: string; level: number } => {
    if (!password) return { label: "", level: 0 }
    if (password.length < 6) return { label: "Weak", level: 1 }
    if (password.length < 10 || !/[A-Z]/.test(password) || !/[0-9]/.test(password))
        return { label: "Fair", level: 2 }
    if (!/[^A-Za-z0-9]/.test(password)) return { label: "Good", level: 3 }
    return { label: "Strong", level: 4 }
}

const strengthConfig = [
    {},
    { color: "bg-red-400",    textColor: "text-red-400" },
    { color: "bg-yellow-400", textColor: "text-yellow-500" },
    { color: "bg-blue-400",   textColor: "text-blue-500" },
    { color: "bg-green-500",  textColor: "text-green-500" },
]

const ChangePasswordViaOTPForm = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [passwordValue, setPasswordValue] = useState("")

    const { register, handleSubmit, setError, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(Inputs)
    })

    const mutation = useMutation({ mutationFn: Authentication.verifyOtp })
    const strength = getStrength(passwordValue)
    const strengthStyle = strengthConfig[strength.level] ?? {}

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const payload = { otp: data.otp, newPassword: data.changePassword }
            const response = await mutation.mutateAsync(payload)
            console.log(response)
            toast.success(`Successfully changed the password.`)
            router.push(`/login`)
        } catch (error) {
            setError('root', {
                message:
                    error instanceof Error ? error.message
                    : typeof error === "string" ? error
                    : "Something went wrong"
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-110 sm:w-125 md:w-150 lg:w-175 bg-white mt-4 rounded-2xl'>
            <div className='flex w-full flex-col gap-6'>

                {/* OTP */}
                <div className='flex w-full flex-col gap-2'>
                    <label className='text-sm text-(--neutral)'>OTP Code</label>
                    <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg'>
                        <FaLaptopCode className='text-(--neutral) text-xl' />
                        <input
                            {...register('otp')}
                            type='text'
                            className='outline-none border-none text-(--neutral) focus:text-(--primary) text-md md:text-lg flex-1'
                            placeholder='Enter 6-digit code'
                        />
                    </div>
                    {errors.otp && <p className='text-red-500 font-semibold'>{errors.otp.message}</p>}
                </div>

                {/* New Password */}
                <div className='flex w-full flex-col gap-2'>
                    <label className='text-sm text-(--neutral)'>Change Password</label>
                    <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg'>
                        <CiUnlock className='text-(--neutral) text-xl shrink-0' />
                        <input
                            {...register('changePassword', {
                                onChange: (e) => setPasswordValue(e.target.value)
                            })}
                            type={showPassword ? 'text' : 'password'}
                            className='outline-none border-none text-(--neutral) focus:text-(--primary) text-md md:text-lg flex-1'
                            placeholder='Min. 8 Character'
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword(v => !v)}
                            className='shrink-0 text-(--neutral) hover:text-(--primary) transition-colors'
                        >
                            {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                        </button>
                    </div>

                    {/* Strength bar */}
                    {passwordValue && (
                        <div className='flex flex-col gap-1'>
                            <div className='h-1.5 w-full bg-gray-200 rounded-full overflow-hidden'>
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ${strengthStyle.color}`}
                                    style={{ width: `${(strength.level / 4) * 100}%` }}
                                />
                            </div>
                            <p className='text-sm text-(--neutral)'>
                                Password strength:{" "}
                                <span className={`font-semibold ${strengthStyle.textColor}`}>
                                    {strength.label}
                                </span>
                            </p>
                        </div>
                    )}

                    {errors.changePassword && <p className='text-red-500 font-semibold'>{errors.changePassword.message}</p>}
                </div>

                {/* Confirm Password */}
                <div className='flex w-full flex-col gap-2'>
                    <label className='text-sm text-(--neutral)'>Confirm new password</label>
                    <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg'>
                        <CiUnlock className='text-(--neutral) text-xl shrink-0' />
                        <input
                            {...register('confirmPassword')}
                            type={showConfirm ? 'text' : 'password'}
                            className='outline-none border-none text-(--neutral) focus:text-(--primary) text-md md:text-lg flex-1'
                            placeholder='Repeat new password'
                        />
                        <button
                            type='button'
                            onClick={() => setShowConfirm(v => !v)}
                            className='shrink-0 text-(--neutral) hover:text-(--primary) transition-colors'
                        >
                            {showConfirm ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                        </button>
                    </div>
                    {errors.confirmPassword && <p className='text-red-500 font-semibold'>{errors.confirmPassword.message}</p>}
                </div>

            </div>

            <button
                type='submit'
                className='w-full bg-(--primary) rounded-xl py-4 text-white text-lg md:text-xl font-bold mt-8 cursor-pointer hover:bg-(--primary)/90 flex items-center justify-center'
            >
                Update Password
            </button>

            {errors.root && <p className='text-red-500 font-semibold mt-2'>{errors.root.message}</p>}
        </form>
    )
}

export default ChangePasswordViaOTPForm