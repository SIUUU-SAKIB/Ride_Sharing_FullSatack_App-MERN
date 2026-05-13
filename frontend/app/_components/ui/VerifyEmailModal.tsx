'use client'

import { CheckCircle2, Mail } from 'lucide-react'

interface VerifyEmailModalProps {
  open: boolean
  email: string
  onClose: () => void
}

const VerifyEmailModal = ({
  open,
  email,
  onClose,
}: VerifyEmailModalProps) => {
  if (!open) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 '>

      {/* modal */}
      <div
        className='
          w-full
          max-w-md
          rounded-3xl
          bg-white
          p-6
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
        '
      >
        {/* success icon */}
        <div className='flex justify-center'>
          <div
            className='
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-green-100
            '
          >
            <CheckCircle2
              className='text-green-600'
              size={40}
              strokeWidth={2.5}
            />
          </div>
        </div>

        {/* heading */}
        <div className='mt-6 text-center'>
          <h2 className='text-2xl font-bold text-(--neutral)'>
            Account Created
          </h2>

          <p className='mt-3 text-sm md:text-base text-gray-600 leading-relaxed'>
            Your account has been created successfully.
          </p>
        </div>

        {/* email box */}
        <div
          className='
            mt-6
            flex
            items-center
            gap-3
            rounded-2xl
            bg-(--neutral)/10
            px-4
            py-4
          '
        >
          <Mail
            className='text-(--primary) shrink-0'
            size={24}
          />

          <div className='flex flex-col'>
            <span className='text-sm text-gray-500'>
              Verification email sent to
            </span>

            <span className='font-semibold text-(--neutral) break-all'>
              {email}
            </span>
          </div>
        </div>

        {/* instructions */}
        <p className='mt-5 text-center text-sm text-gray-500 leading-relaxed'>
          Please check your inbox and verify your email
          address before logging in.
        </p>

        {/* actions */}
       <button
  onClick={() => {
    window.open(
      "https://mail.google.com",
      "_blank"
    )
  }}
  className='
    mt-6
    w-full
    rounded-2xl
    bg-(--primary)
    py-3
    text-lg
    font-semibold
    text-white,
    cursor-pointer
  '
>
  Open Gmail
</button>
      </div>
    </div>
  )
}

export default VerifyEmailModal