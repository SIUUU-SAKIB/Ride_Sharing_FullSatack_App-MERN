
import DriverRegistrationForm from '@/app/_components/Forms/driverRegistrationForm'
import BottomNav from '@/app/_components/Navigation/BottomNav'
import Nav from '@/app/_components/Navigation/Nav'
import { useCurrentUser } from '@/app/_hooks/useCurrentUser'

const DriverRegistration = () => {

  return (
    <div className='max-w-6xl mx-auto pb-12'>
      <Nav />
      <div className='w-full bg-zinc-100/50'>
        <div className='flex flex-col gap-2 max-w-125 py-8 px-4'>
          <p className=' text-start text-xl md:text-4xl lg:text-bold font-bold'>Become a Driver</p>
          <p className='text-md md:text-lg text-(--neutral)'>Complete your application to start earning with RideX</p>
        </div>
        <DriverRegistrationForm />
      </div>
      
      <BottomNav />

    </div>
  )

}

export default DriverRegistration