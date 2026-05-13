'use client'
import { Authentication } from '@/app/_services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Eye, EyeOff, Lock, Mail, Smartphone, User, UserRoundPen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import ButtonLoader from '../ui/ButtonLoader'
import VerifyEmailModal from '../ui/VerifyEmailModal'


const schema = z.object({
  name: z.string({ message: "Name is required" }).min(2, { message: "Name must contain more than 2 letter" }),
  email: z.string().email({ message: "Email is required" }).min(6).includes(`@`, { message: "Email must include '@'" }),
  password: z.string({ message: "Password is required" }).min(7, { message: "Password must include 7 characters" }),
  phone: z
    .string()
    .min(4, { message: "Invalid phone number" }),
  profilePhoto: z
    .any()
    .optional()
    .refine((files) => {
      if (!files?.length) return true

      return files[0].size <= 1000000
    }, "Max image size is 1MB")
})

type FormFields = z.infer<typeof schema>


const RegisterForm = () => {
  const [seePassword, setSeePassword] = React.useState<boolean>(false)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [submittedEmail, setSubmittedEmail] = React.useState<string>('')
  // API HANDLERS

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['root'],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`)
      if (!response.ok) {
        throw new Error('Failed to fetch')
      }
      return response.json()
    },
  })


  //  FORM HANDLERS
  const mutation = useMutation({
    mutationFn: Authentication.registerUser
  })
  const { register, watch, reset, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({
    resolver: zodResolver(schema)
  })
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const result = await mutation.mutateAsync(data)
      setSubmittedEmail(data.email)
      reset()
      setOpenModal(true)
      console.log(result)
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong"
      })
    }
  }

  return (
    <>
      <div className='mx-auto  xs:w-[450px] sm:w-125 md:w-150 lg:w-175 bg-white mt-4 rounded-2xl'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col gap-6 items-start justify-center px-4  py-6'>
          {/* name */}
          <div className='flex flex-col w-full gap-2 space-x-4'>
            <label className='text-sm text-(--neutral)'>Full Name</label>
            <div className='flex gap-6  items-center px-2 py-4 bg-(--neutral)/10 rounded-lg '>
              <User className='text-(--neutral)' />
              <input required autoComplete='name' type='text' className='outline-none border-none text-(--neutral) focus:text-(--primary) text:md md:text-lg flex-1' placeholder='John Doe'
                {...register('name')} />

            </div>
            {errors.name && (
              <div className='text-red-500'>{errors.name.message}</div>
            )}
          </div>


          {/* email */}
          <div className='flex w-full flex-col gap-2 space-x-4'>
            <label className='text-sm text-(--neutral)'>Email address</label>
            <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg focus:text-(--primary)'>
              <Mail className='text-(--neutral)' />
              <input autoComplete='email' required type='text' className='outline-none border-none text-(--neutral) focus:text-(--primary) text:md md:text-lg flex-1' placeholder='John123@gmail.com'

                {...register('email')} />

            </div>
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>

          {/* Phone number*/}
          <div className='flex w-full flex-col gap-2 space-x-4'>
            <label className='text-sm text-(--neutral)'>Phone Number</label>
            <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg'>
              <Smartphone className='text-(--neutral)' />
              <input {...register('phone')} type='text' className='outline-none border-none text-(--neutral) focus:text-(--primary) text:md md:text-lg flex-1' placeholder='+880 1796111111' required={true} />
            </div>
          </div>

          {/*password*/}
          <div className='flex flex-col w-full gap-2'>
            <label className='text-sm text-(--neutral)'>Password</label>
            <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg'>

              <Lock className='text-(--neutral) ml-2 shrink-0 mr-3' />
              <input

                type={seePassword ? "text" : "password"}
                className='flex-1 h-full outline-none border-none bg-transparent text-(--neutral) focus:text-(--primary) text-base md:text-lg'
                placeholder='*******'
                {...register('password')}

              />


              <Eye onClick={() => setSeePassword(true)} className={`text-(--neutral) ${seePassword ? "hidden" : "block"} ml-2 cursor-pointer shrink-0`} />
              <EyeOff onClick={() => setSeePassword(false)} className={`text-(--neutral) ${!seePassword ? "hidden" : "block"} ml-2 cursor-pointer shrink-0`} />
            </div>
            {
              errors.password && <div className='text-red-500'>{errors.password.message}</div>
            }
          </div>
          {/*profile picture*/}
          <div className='flex flex-col w-full gap-2'>
            <label className='text-sm text-(--neutral)'>Profile Photo    (optional)</label>
            <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg'>

              <UserRoundPen className='text-(--neutral) ml-2 shrink-0 mr-3' />
              <input
                type="file"
                accept="image/*"
                className=" flex-1 h-full outline-none border-none bg-transparent text-(--neutral) text-base md:text-lg"
                {...register("profilePhoto")}
              />
            </div>
          </div>

          <button disabled={mutation.isPending} type='submit' className='w-full bg-(--primary) rounded-xl py-2 md:py-4 text-white text-shadow-xs text-lg md:text-xl font-bold my-4 cursor-pointer hover:bg-(--primary)/90'>
            {!mutation.isPending ? 'Create Account': <ButtonLoader/>}
          </button>
          <p className='text-(--neutral) text-center w-full'>Already have an account? <Link href={`/login`} className='text-(--primary) font-semibold hover:underline cursor-pointer'>Login</Link></p>
          {errors.root && <div className='text-red-500'>{errors.root.message}</div>}
        </form>
      </div>
      <VerifyEmailModal
        open={openModal}
        email={submittedEmail}
        onClose={() => setOpenModal(false)}

      />
    </>
  )
}


export default RegisterForm