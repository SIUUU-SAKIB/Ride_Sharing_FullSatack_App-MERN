"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, MoveLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { PasswordField } from "../ui/PasswordField"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { Authentication } from "@/app/_services/auth"
import useChangePassword from "@/app/_hooks/useChangePassword"

const Inputs = z
  .object({
    currentPassword: z.string({ message: "Current password required" }).min(8, { message: "At lest 8 characters rquired" }),
    newPassword: z.string({ message: "New password rquired" }).min(8, { message: "At lest 8 characters rquired" }),
    confirmPassword: z.string({ message: "New password rquired" }).min(8, { message: "At lest 8 characters rquired" }),
  })
  .refine(
    (data) =>
      data.newPassword === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  )
type FormFields = z.infer<typeof Inputs>

const ChangePasswordForm = () => {
  const router = useRouter()
  const { register,
    handleSubmit,
    setError,
    formState: { errors } } = useForm<FormFields>({
      resolver: zodResolver(Inputs)
    })
  const mutation = useMutation({ mutationFn: Authentication.changePassword })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const payload = {
        oldPass: data.currentPassword,
        newPass: data.newPassword
      }
      const response = await mutation.mutateAsync(payload)
      console.log(payload)
      console.log(response)
      toast.success('Successfully changed the password')
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
    <div className="min-w-screen bg-zinc-100/80 min-h-screen">
      <div className="pl-2 md:pl-4 lg:px-8 flex gap-4 items-center py-4">
        <Link href={'/user/profile'}>
          <MoveLeft className="text-xl" />
        </Link>
        <p className="text-xl md:text-2xl font-semibold text-(--primary)">Change Password</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl px-12 mx-auto bg-white rounded-lg gap-4 pt-12 pb-16">
        <p className="text-(--neutral) text-lg">Update your password to keep account secure.</p>

        {/* current password */}
        <PasswordField
          label="Current Password"
          placeholder="*******"
          register={register('currentPassword')}
          error={errors.currentPassword}
          showForgotPassword
        />
        {/* new password */}
        <PasswordField
          label="New Password"
          placeholder="Min. 8 characters"
          register={register('newPassword')}
          error={errors.newPassword}
        />
        {/* confirm new password */}
        <PasswordField
          label="Confirm new Password"
          placeholder="Confirm new password"
          register={register('confirmPassword')}
          error={errors.confirmPassword}
        />
        <button type="submit" className="text-white cursor-pointer bg-(--primary)/90 hover:bg-(--primary) transtion duration-75 rounded-lg px-12 py-4 font-semibold  text-xl text-center w-full my-8">Change Password</button>
        {errors.root && <p className="font-semibold text-xl text-red-500">{errors.root.message}</p>}
      </form>
    </div>
  )
}

export default ChangePasswordForm