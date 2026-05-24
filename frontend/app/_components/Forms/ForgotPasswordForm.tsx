'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from "zod"
import ButtonLoader from '../ui/ButtonLoader'
import { Authentication } from '@/app/_services/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
const emailSchema = z.object({
    email: z
        .string()
        .email({
            message: "Invalid email address"
        })
})
type FormFields = z.infer<typeof emailSchema>


const ForgotPasswordForm = () => {
    const router = useRouter()
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({
        resolver: zodResolver(emailSchema)
    })

    const mutation = useMutation({
        mutationFn: Authentication.forgetPassword
    })
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const response = await mutation.mutateAsync(data.email)
            console.log(response)
            toast.success(`OTP send to your email`)
            router.push(`/user/verify-otp`)
        } catch (error) {
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
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col items-start gap-4'>
            <div className='flex w-full gap-2 bg-(--neutral)/10 rounded-sm px-4 py-2 items-center'>
                <Mail className='text-(--neutral) text-lg' />
                <input {...register('email')}  className='flex-1 py-1 outline-none border-none text-md focus:text-(--primary)' placeholder='name@example.com' />
            
            </div>
                {
                    errors.email && (
                        <p className='text-red-500 font-semibold'>
                            {errors.email.message}
                        </p>
                    )
                }
            <button type='submit' className='text-white w-full bg-(--primary) py-2 shadow-md text-xl rounded-lg font-bold hover:bg-(--primary)/70 cursor-pointer'>{mutation.isPending ? <ButtonLoader /> : "Submit"}</button>
            {errors.root &&
                <p className='text-lg text-red-500 font-semibold'>{errors.root.message}
                </p>}

        </form>
    )
}

export default ForgotPasswordForm