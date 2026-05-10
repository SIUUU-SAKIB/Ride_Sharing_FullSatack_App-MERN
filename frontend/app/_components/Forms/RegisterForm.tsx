'use client'
import { CarFront, Eye, EyeOff, Lock, Mail, Smartphone, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'



const RegisterForm = () => {
  const [clicked, setClicked] = React.useState<boolean>(false)
  const [isDriver, setIsDriver] = React.useState<boolean>(false)
  const [name, setName] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [phone, setPhone] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [seePassword, setSeePassword] = React.useState<boolean>(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setName('')
    setEmail('')
    setPassword('')
    setPhone('')
  }
  return (
    <div className='mx-auto  xs:w-[450px] sm:w-125 md:w-150 lg:w-175 bg-white mt-4 rounded-2xl'>
      <form onSubmit={handleSubmit} className='flex w-full flex-col gap-6 items-start justify-center px-4  py-6'>
        {/* name */}
        <div className='flex flex-col w-full gap-2 space-x-4'>
          <label className='text-sm text-(--neutral)'>Full Name</label>
          <div className='flex gap-6  items-center px-2 py-4 bg-(--neutral)/10 rounded-lg '>
            <User className='text-(--neutral)' />
            <input autoComplete='name' onChange={(e) => setName(e.target.value)}
              value={name} type='text' className='outline-none border-none text-(--neutral) focus:text-(--primary) text:md md:text-lg flex-1' placeholder='John Doe' required={true} />
          </div>
        </div>


        {/* email */}
        <div className='flex w-full flex-col gap-2 space-x-4'>
          <label className='text-sm text-(--neutral)'>Email address</label>
          <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg'>
            <Mail className='text-(--neutral)' />
            <input autoComplete='email' onChange={(e) => setEmail(e.target.value)} value={email} type='email' className='outline-none border-none text-(--neutral) focus:text-(--primary) text:md md:text-lg flex-1' placeholder='John123@gmail.com' required={true} />
          </div>
        </div>

        {/* Phone number*/}
        <div className='flex w-full flex-col gap-2 space-x-4'>
          <label className='text-sm text-(--neutral)'>Phone Number</label>
          <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg'>
            <Smartphone className='text-(--neutral)' />
            <input onChange={(e) => setPhone(e.target.value)} value={phone} type='text' className='outline-none border-none text-(--neutral) focus:text-(--primary) text:md md:text-lg flex-1' placeholder='+880 1796111111' required={true} />
          </div>
        </div>

        {/*password*/}
        <div className='flex flex-col w-full gap-2'>
          <label className='text-sm text-(--neutral)'>Password</label>
          <div className='flex gap-6 items-center px-2 py-4 bg-(--neutral)/10 rounded-lg'>

            <Lock className='text-(--neutral) ml-2 shrink-0 mr-3' />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={seePassword ? "text" : "password"}
              className='flex-1 h-full outline-none border-none bg-transparent text-(--neutral) focus:text-(--primary) text-base md:text-lg'
              placeholder='*******'
              required
            />

            <Eye onClick={() => setSeePassword(true)} className={`text-(--neutral) ${seePassword ? "hidden" : "block"} ml-2 cursor-pointer shrink-0`} />
            <EyeOff onClick={() => setSeePassword(false)} className={`text-(--neutral) ${!seePassword ? "hidden" : "block"} ml-2 cursor-pointer shrink-0`} />
          </div>
        </div>
        {/* i want join */}
        <div className='flex flex-col w-full gap-1 bg-(--neutral)/10 p-2 rounded-lg  '>
          <label className='text-sm text-(--neutral) pb-1'>I want to join as a</label>
          <div className='w-full flex gap-2 items-center justify-between'>
            <div onClick={() => {
              setClicked(false)
              setIsDriver(false)
            }} className={`w-1/2 ${!clicked ? "bg-white" : "bg-transparent"} p-2 lg:p-4 rounded-lg flex items-center gap-1 cursor-pointer transition duration-150 justify-center`}>
              <User size={20} className={`text-(--primary) text-xs ${!clicked ? "text-(--primary)" : "text-gray-700"}`} />
              <p className={`text-sm md:text-lg  ${!clicked ? "text-(--primary)" : "text-gray-700"}`}>Rider</p>
            </div>

            <div onClick={() => {
              setClicked(true)
              setIsDriver(true)
            }} className={`w-1/2 ${clicked ? "bg-white" : "bg-transparent"} p-2 lg:p-4 rounded-lg flex items-center gap-1 cursor-pointer transition duration-150 justify-center`}>
              <CarFront size={20} className={`text-(--primary) text-xs ${clicked ? "text-(--primary)" : "text-gray-700"}`} />
              <p className={`text-sm md:text-lg ${clicked ? "text-(--primary)" : "text-gray-700"}`}>Driver</p>
            </div>
          </div>
        </div>
        <button type='submit' className='w-full bg-(--primary) rounded-xl py-2 md:py-4 text-white text-shadow-xs text-lg md:text-xl font-bold my-4 cursor-pointer hover:bg-(--primary)/90'>Create Account</button>
        <p className='text-(--neutral) text-center w-full'>Already have an account? <Link href={`/login`} className='text-(--primary) font-semibold hover:underline cursor-pointer'>Login</Link></p>
      </form>
    </div>
  )
}

export default RegisterForm