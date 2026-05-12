import { LoaderCircle } from 'lucide-react'

const FullScreenLoader = () => {
  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-white/10'>
      <div className='flex flex-col items-center gap-4'>
        <LoaderCircle
          className='animate-spin text-(--primary)'
          size={50}
          strokeWidth={2.5}
        />

        <p className='text-(--neutral) text-lg font-medium'>
          Loading...
        </p>
      </div>
    </div>
  )
}

export default FullScreenLoader