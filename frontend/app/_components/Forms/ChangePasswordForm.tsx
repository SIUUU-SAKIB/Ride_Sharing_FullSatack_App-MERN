"use client"
import { useState } from "react"
import { ArrowLeft, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
const getStrength = (password: string) => {
  if (!password) return { label: "", level: 0 }
  if (password.length < 6) return { label: "Weak", level: 1 }
  if (password.length < 10 || !/[A-Z]/.test(password) || !/[0-9]/.test(password))
    return { label: "Fair", level: 2 }
  if (!/[^A-Za-z0-9]/.test(password)) return { label: "Good", level: 3 }
  return { label: "Strong", level: 4 }
}
const strengthColors = ["", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"]

const PasswordInput = ({
  label,
  placeholder,
  value,
  onChange,
  showForgot,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  showForgot?: boolean
}) => {
  const [visible, setVisible] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm sm:text-base font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-3 bg-[#EEF0F5] rounded-xl px-4 py-3.5">
        <Lock className="w-5 h-5 text-gray-500 shrink-0" />
        <input
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-gray-700 placeholder:text-gray-400 text-sm sm:text-base outline-none"
        />
        <button type="button" onClick={() => setVisible((v) => !v)} className="shrink-0">
          {visible ? (
            <EyeOff className="w-5 h-5 text-gray-500" />
          ) : (
            <Eye className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>
      {showForgot && (
        <div className="flex justify-end">
          <button className="text-sm font-semibold text-[#1A9E5F]">Forgot Password?</button>
        </div>
      )}
    </div>
  )
}
const Inputs = z.object({
  currentPassword: z.string({ message: "Current Password required" }).min(8, { message: "At least 8 characters requiered" }),
  newPassword: z.string({ message: "New Password required" }).min(8, { message: "At least 8 characters requiered" }),
  confirmNewPassword: z.string({ message: "Current Password required" }).min(8, { message: "At least 8 characters requiered" })
}
)
type FormFields = z.infer<typeof Inputs>

const ChangePasswordForm = () => {
  const router = useRouter()
  const [current, setCurrent] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confirm, setConfirm] = useState("")
  const strength = getStrength(newPass)

  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormFields>({
    resolver: zodResolver(Inputs)
  })
  const onSubmit: SubmitHandler<FormFields> =async (data) => {
    console.log(data)
  }

  return (
    <div className="min-h-screen bg-[#F2F4F8] flex flex-col pt-12">
      <div className="max-w-lg mx-auto w-full =flex flex-col px-5 pt-6 pb-10 shadow-sm bg-zinc-100/50">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-[#1A9E5F]">Change Password</h1>
        </div>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm sm:text-base mb-8 leading-relaxed">
          Update your password to keep your account secure.
        </p>

        {/* Fields */}
       
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <PasswordInput
              {...register('currentPassword')}
              label="Current Password"
              placeholder="••••••••"
              value={current}
              onChange={setCurrent}
              showForgot
            />

            <div className="flex flex-col gap-2">
              <PasswordInput
                {...register('newPassword')}
                label="New Password"
                placeholder="Min. 8 characters"
                value={newPass}
                onChange={setNewPass}
              />
              {/* Strength bar */}
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${strengthColors[strength.level]}`}
                  style={{ width: `${(strength.level / 4) * 100}%` }}
                />
              </div>
              {newPass.length > 0 && (
                <p className="text-sm text-gray-500">
                  Password strength:{" "}
                  <span
                    className={`font-semibold ${strength.level === 1
                      ? "text-red-400"
                      : strength.level === 2
                        ? "text-yellow-500"
                        : strength.level === 3
                          ? "text-blue-500"
                          : "text-green-500"
                      }`}
                  >
                    {strength.label}
                  </span>
                </p>
              )}
              {!newPass && (
                <p className="text-sm text-gray-400">Password strength: Weak</p>
              )}
            </div>

            <PasswordInput
              {...register('confirmNewPassword')}
              label="Confirm New Password"
              placeholder="Confirm new password"
              value={confirm}
              onChange={setConfirm}
            />
            {confirm && newPass !== confirm && (
              <p className="text-sm text-red-500 -mt-3">Passwords do not match.</p>
            )}
     
    

        {/* Update Button */}
        <button
        type="submit"
          // disabled={!current || !newPass || newPass !== confirm}
          className="mt-8 w-full py-4 rounded-2xl bg-(--primary) cursor-pointer text-white font-bold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-transform"
        >
          Update Password
        </button>
     </form>
        {/* Shield illustration */}
        <div className="flex justify-center mt-10">
          <div className="w-24 h-24 rounded-full bg-[#E6F5EE] flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-[#1A9E5F]/50" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordForm