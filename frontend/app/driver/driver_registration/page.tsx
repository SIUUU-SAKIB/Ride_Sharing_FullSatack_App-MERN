import DriverRegistrationForm from '@/app/_components/Forms/driverRegistrationForm'
import BottomNav from '@/app/_components/Navigation/BottomNav'
import Nav from '@/app/_components/Navigation/Nav'
import React from 'react'

const DriverRegistration = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <Nav/>
      <DriverRegistrationForm />
      <BottomNav />

    </div>
  )
}

export default DriverRegistration