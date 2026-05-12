'use client'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import React from 'react'
import Link from "next/link"
import { z } from "zod"
import { FormSubmitHandler, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
const loginSchema = z.object({
    email: z.string({ message: "Email is required" }).email().includes("@"),
    password: z.string({ message: "Password is required" }).min(7, { message: "Password must include 7 characters" }),
})
type FormFields = z.infer<typeof loginSchema>

const LoginForm = () => {
    const [seePassword, setSeePassword] = React.useState<boolean>(false)
    const { register, handleSubmit, setError, formState: { errors, isSubmitting, isLoading } } = useForm({
        resolver: zodResolver(loginSchema)
    })
    const loginSubmit: SubmitHandler<FormFields> = (data) => {
        try {
            console.log(data)
        } catch (error) {
            setError('root', {
                message: `Something went wrong at ${error}`
            })
        }
    }
    return (
        <div className='mx-auto  xs:w-[450px] sm:w-125 md:w-150 lg:w-175 bg-white mt-4 rounded-2xl'>
            <form onSubmit={handleSubmit(loginSubmit)} className='flex w-full flex-col gap-6 items-start justify-center px-4  py-6'>

                {/* email */}
                <div className='flex w-full flex-col gap-2 space-x-4'>
                    <label className='text-sm text-(--neutral)'>Email address</label>
                    <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg'>
                        <Mail className='text-(--neutral)' />
                        <input autoComplete='email' type='text' className='outline-none border-none text-(--neutral) focus:text-(--primary) text:md md:text-lg flex-1' placeholder='John123@gmail.com'
                            {...register('email')}
                        />
                    </div>
                    {errors.email && <p className='text-red-500 font-semibold'>{errors.email.message}</p>}
                </div>

                {/*password*/}
                <div className='flex flex-col w-full gap-2'>
                    <div className='flex w-full items-center justify-between'><label className='text-sm text-(--neutral) cursor-text'>Password</label><label className='text-md font-semibold text-(--primary)  cursor-pointer'>Forgot Password?</label></div>
                    <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg'>

                        <Lock className='text-(--neutral) ml-2 shrink-0 mr-3' />
                        <input

                            type={seePassword ? "text" : "password"}
                            className='flex-1 h-full outline-none border-none bg-transparent text-(--neutral) focus:text-(--primary) text-base md:text-lg'
                            placeholder='Enter your password'
                            required={true}
                            {...register('password')}
                        />


                        <Eye onClick={() => setSeePassword(true)} className={`text-(--neutral) ${seePassword ? "hidden" : "block"} ml-2 cursor-pointer shrink-0`} />
                        <EyeOff onClick={() => setSeePassword(false)} className={`text-(--neutral) ${!seePassword ? "hidden" : "block"} ml-2 cursor-pointer shrink-0`} />
                    </div>
                    {errors.password && <p className='text-red-500 font-semibold'>{errors.password.message}</p>}
                </div>

                <button type='submit' className='w-full bg-(--primary) rounded-xl py-2 md:py-4 text-white text-shadow-xs text-lg md:text-xl font-bold my-4 cursor-pointer hover:bg-(--primary)/90'>
                    Login
                </button>
                {errors.root && <p className='font-semibold text-lg text-red-500'>{errors.root.message}</p>}
                <p className='text-(--neutral) text-center w-full'>Don't have an account? <Link href={`/register`} className='text-(--primary) font-semibold hover:underline cursor-pointer'>Register</Link></p>
            </form>
        </div>
    )
}

export default LoginForm