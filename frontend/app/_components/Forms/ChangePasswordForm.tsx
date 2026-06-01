"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { MoveLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const Inputs = z
  .object({
    currentPassword: z.string({message:"Current password required"}).min(8, {message:"At lest 8 characters rquired"}),
    newPassword: z.string({message:"New password rquired"}).min(8, {message:"At lest 8 characters rquired"}),
    confirmNewPassword: z.string({message:"New password rquired"}).min(8, {message:"At lest 8 characters rquired"}),
  })
  .refine(
    (data) =>
      data.newPassword === data.confirmNewPassword,
    {
      path: ["confirmNewPassword"],
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



  return (
    <div className="min-w-full">
      <div className="w-full pl-2 md:pl-4 lg:px-8 flex gap-4 items-center shadow-xs py-4">
        <Link href={'/user/profile'}>
        <MoveLeft className="text-xl"/>
        </Link>
        <p className="text-xl md:text-2xl font-semibold text-(--primary)">Change Password</p>
        

      </div>
    </div>
  )
}

export default ChangePasswordForm