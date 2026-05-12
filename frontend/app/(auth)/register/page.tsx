import RegisterForm from '@/app/_components/Forms/RegisterForm'
import Link from 'next/link'

const RegisterPage = () => {

  return (
        <div className='min-h-screen py-12 w-full bg-zinc-900/10 flex flex-col items-center'>
      <div className='flex flex-col gap-2 items-center text-center'>
        <Link href={`/`} className='text-4xl font-extrabold text-(--primary) text-shadow-2xs cursor-pointer'>RideX</Link>
        <p className='text-md text-gray-700'>Join the movement</p>
      </div>
      <RegisterForm/>
    </div>
  )
}

export default RegisterPage