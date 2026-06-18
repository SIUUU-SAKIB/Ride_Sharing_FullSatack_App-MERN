import { CiExport } from 'react-icons/ci'
import DriverFilters from '../_components/drivers/DriverFilters'

const Drivers = () => {
  return (
    <div className='pt-12 px-12 mx-auto min-w-7xl'>
      <div className='flex items-center justify-between w-full'>
      <div className='flex flex-col'>
        <p className='text-2xl font-semibold'>Driver Applications</p>
        <p className='text-md text-(--neutral)'>Review and manage incoming driver onboarding requests</p>
      </div>
      <div className='flex gap-1 items-center p-2 border-0 border-black rounded-lg bg-white cursor-pointer '>
       <CiExport className='transform rotate-180 text-md font-medium' />
        <p className='text-md '>Export CSV</p>
      </div>
    </div>
    <DriverFilters/>
    </div>
       
  )
}

export default Drivers