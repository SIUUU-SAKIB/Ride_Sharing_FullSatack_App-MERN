"use client"
import RadioIcon from '@iconify-react/formkit/radio';
import PenIcon from '@iconify-react/lucide/pen';
const MainHomePage = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-(--neutral) text-lg">PICKUP</p>
          <div className='flex items-center gap-4'>
            <RadioIcon height="24" className='text-(--primary) ' />
            <p className='text-lg font-bold'>Current Location</p>
          </div>
        </div>
        <PenIcon height="24" />
      </div>
    </div>
  )
}

export default MainHomePage