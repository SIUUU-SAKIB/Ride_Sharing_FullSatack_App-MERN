'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail } from 'lucide-react'
import React, { useState } from 'react'
import { ReactFormState } from 'react-dom/client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from "zod"
import ButtonLoader from '../ui/ButtonLoader'
const emailSchema = z.object({
    email: z.email({ message: "Email is required" }).includes("@", { message: "Email must include @" })
})
type FormFields = z.infer<typeof emailSchema>


const ForgotPasswordForm = () => {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting, isLoading } } = useForm({
        resolver: zodResolver(emailSchema)
    })
    const onSubmit:SubmitHandler<FormFields> = () => {
console.log()
    }
    return (
        <form onSubmit={() => handleSubmit(onSubmit)} className='w-full flex flex-col items-start gap-4'>
            <div className='flex w-full gap-2 bg-(--neutral)/10 rounded-sm px-4 py-2 items-center'>
                <Mail className='text-(--neutral) text-lg' />
                <input {...register('email')} className='flex-1 py-1 outline-none border-none text-md' placeholder='name@example.com' />

            </div>
            <button type='submit' className='text-white w-full bg-(--primary) py-2 shadow-md text-xl rounded-lg font-bold hover:bg-(--primary)/70 cursor-pointer'>{isSubmitting ? <ButtonLoader />:"Submit"}</button>
        </form>
    )
}

export default ForgotPasswordForm