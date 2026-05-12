import { LoaderCircle } from 'lucide-react'

const ButtonLoader = () => {
  return (
    <LoaderCircle
      className='animate-spin text-white w-full mx-auto'
      size={20}
      strokeWidth={2.5}
    />
  )
}

export default ButtonLoader