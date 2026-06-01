"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeClosed, EyeClosedIcon, EyeOff, Lock, MoveLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

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
      path: ["confirmNewPassword"],
      message: "Passwords do not match",
    }
  )
type FormFields = z.infer<typeof Inputs>
const ChangePasswordForm = () => {
  const [currentPassEye, setCurrrentPassEye] = React.useState<boolean>(false)
  const [newPassEye, setNewPassEye] = React.useState<boolean>(false)
  const [confirmPassEye, setConfirmPassEye] = React.useState<boolean>(false)
  const router = useRouter()
  const { register,
    handleSubmit,
    setError,
    formState: { errors } } = useForm<FormFields>({
      resolver: zodResolver(Inputs)
    })

const onSubmit:SubmitHandler<FormFields> = async(data) => {
console.log(await data)
console.log(`dfsaasfsaf`)
}

  return (
    <div className="min-w-screen bg-zinc-100/80 min-h-screen">
      <div className="pl-2 md:pl-4 lg:px-8 flex gap-4 items-center shadow-xs py-4">
        <Link href={'/user/profile'}>
          <MoveLeft className="text-xl" />
        </Link>
        <p className="text-xl md:text-2xl font-semibold text-(--primary)">Change Password</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl px-12 mx-auto bg-white rounded-lg gap-4 pt-12 pb-16">
        <p className="text-(--neutral) text-lg">Update your password to keep account secure.</p>

        {/* current password */}
        <div className="flex flex-col gap-2 justify-center pt-8">
          <label className="text-black/80 text-lg">Current Password</label>
          <div className="flex gap-2 items-center justify-between bg-zinc-100/80 px-4 rounded-sm">
            <div className="flex flex-1 gap-2 items-center justify-center">
              <Lock className="text-(--neutral)" />
              <input className="flex-1 text-(--neutral) py-4 border-none outline-none"
                placeholder="********"
                type={currentPassEye ? "text" : "password"}
                {...register('currentPassword')}
              />
            </div>
            <Eye onClick={() => setCurrrentPassEye(true)} className={`cursor-pointer text-(--neutral) ${currentPassEye ? "hidden" : "block"}`} />
            <EyeOff onClick={() => setCurrrentPassEye(false)}  className={`cursor-pointer text-(--neutral) ${currentPassEye ? "block" : "hidden"}`} />
          </div>
          <Link href={'/user/forgot_password'} className="text-end pt-2 text-(--primary) font-semibold">Forgot Password?</Link>
          {errors.currentPassword && <p className="text-md text-red-500 font-semibold">{errors.currentPassword.message}</p>}
        </div>
   {/* new password */}
    <div className="flex flex-col gap-2 justify-center pt-8">
          <label className="text-black/80 text-lg">New Password</label>
          <div className="flex gap-2 items-center justify-between bg-zinc-100/80 px-4 rounded-sm">
            <div className="flex flex-1 gap-2 items-center justify-center">
              <Lock className="text-(--neutral)" />
              <input className="flex-1 text-(--neutral) py-4 border-none outline-none"
                placeholder="Min. 8 characters"
                type={newPassEye ? "text" : "password"}
                {...register('newPassword')}
              />
            </div>
            <Eye onClick={() => setNewPassEye(true)} className={`cursor-pointer text-(--neutral) ${newPassEye ? "hidden" : "block"}`} />
            <EyeOff onClick={() => setNewPassEye(false)}  className={`cursor-pointer text-(--neutral) ${newPassEye ? "block" : "hidden"}`} />
          </div>
          {errors.newPassword && <p className="text-md text-red-500 font-semibold">{errors.newPassword.message}</p>}
        </div>
        {/* confirm new password */}
         <div className="flex flex-col gap-2 justify-center pt-8">
          <label className="text-black/80 text-lg">Confirm New Password</label>
          <div className="flex gap-2 items-center justify-between bg-zinc-100/80 px-4 rounded-sm">
            <div className="flex flex-1 gap-2 items-center justify-center">
              <Lock className="text-(--neutral)" />
              <input className="flex-1 text-(--neutral) py-4 border-none outline-none"
                placeholder="Confirm new password"
                type={confirmPassEye ? "text" : "password"}
                {...register('confirmPassword')}
              />
            </div>
            <Eye onClick={() => setConfirmPassEye(true)} className={`cursor-pointer text-(--neutral) ${currentPassEye ? "hidden" : "block"}`} />
            <EyeOff onClick={() => setConfirmPassEye(false)}  className={`cursor-pointer text-(--neutral) ${confirmPassEye ? "block" : "hidden"}`} />
          </div>
          {errors.confirmPassword && <p className="text-md text-red-500 font-semibold">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className="text-white cursor-pointer bg-(--primary)/90 hover:bg-(--primary) transtion duration-75 rounded-lg px-12 py-4 font-semibold  text-xl text-center w-full my-8">Change Password</button>
      </form>
    </div>
  )
}

export default ChangePasswordForm