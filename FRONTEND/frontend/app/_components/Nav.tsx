import Image from 'next/image'
import Link from 'next/link'


const Nav = () => {
    return (
        <div className='min-w-screen-2xl bg-white h-12 px-4 md:px-12 py-2 md:py-8 flex items-center justify-between shadow-md'>
            {/* logo container */}
            <div className='flex gap-2 py-2 items-center justify-center text-black'>
                <Link href='/'>
                <Image
                    src={'/car.png'}
                    alt='RideShare Logo'
                    width={500}
                    height={500}
                    className='w-7 h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain'
                /></Link>
                <Link href={'/'} className='text-xl text-black font-bold md:text-2xl md:font-extrabold lg:text-4xl'>RideX</Link>
            </div>
            {/* navigation links */}
            <div className='flex gap-4 py-2 items-center justify-center'>
                <Link href={'/login'} className='text-black text-sm md:text-lg lg:text-xl hover:text-[#064E3B] hover:font-medium transition duration-300 px-2 py-1 rounded-full border border-gray-400'>
                    Login
                </Link>
                <Link
                    href={'/register'}
                    className='text-black text-sm md:text-lg lg:text-xl hover:font-medium transition duration-300 hover:text-white px-2 py-1 rounded-full border border-gray-400'
                >
                    Sign Up
                </Link>
            </div>
        </div>
    )
}

export default Nav