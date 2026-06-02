"use client"

import React from "react"
import { Eye, EyeOff, Lock } from "lucide-react"
import { FieldError, UseFormRegisterReturn } from "react-hook-form"
import Link from "next/link"

interface PasswordFieldProps {
  label: string
  placeholder: string
  register: UseFormRegisterReturn
  error?: FieldError
  showForgotPassword?: boolean
}

export const PasswordField = ({
  label,
  placeholder,
  register,
  error,
  showForgotPassword = false,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="flex flex-col gap-2 justify-center pt-8">
      <label className="text-black/80 text-lg">
        {label}
      </label>

      <div className="flex gap-2 items-center justify-between bg-zinc-100/80 px-4 rounded-sm">

        <div className="flex flex-1 gap-2 items-center">
          <Lock className="text-(--neutral)" />

          <input
            className="flex-1 text-(--neutral) py-4 border-none outline-none bg-transparent"
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            {...register}
          />
        </div>

        {showPassword ? (
          <EyeOff
            onClick={() => setShowPassword(false)}
            className="cursor-pointer text-(--neutral)"
          />
        ) : (
          <Eye
            onClick={() => setShowPassword(true)}
            className="cursor-pointer text-(--neutral)"
          />
        )}
      </div>

      {showForgotPassword && (
        <Link
          href="/user/forgot_password"
          className="text-end pt-2 text-(--primary) font-semibold"
        >
          Forgot Password?
        </Link>
      )}



      {error && (
        <p className="text-md text-red-500 font-semibold">
          {error.message}
        </p>
      )}
    </div>
  )
}

