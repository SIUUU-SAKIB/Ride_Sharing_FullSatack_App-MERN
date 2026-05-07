import Image from 'next/image'
import Link from 'next/link'


const Nav = () => {
    const session = true
    return (
        <div className='min-w-screen-2xl bg-white h-16 px-4 md:px-12 py-2 md:py-8 flex items-center justify-between shadow-md'>
            {/* logo container */}
            <div className='flex gap-2 py-2 items-center justify-center text-black '>
                {/* session === false */}
                <Link href='/' className={`${session ? "hidden" : "block"
                }`}>
                <Image
                    src={'/car.png'}
                    alt='RideShare Logo'
                    width={500}
                    height={500}
                    className='w-7 h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain'
                /></Link>
               {/* session ===true */}
               <Link href='/' className={`${session ? "block" : "hidden"
                }`}>
                <Image
                    src={'/ronaldo.jpg'}
                    alt='user profile photo'
                    width={500}
                    height={500}
                    className='w-10 h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 object-cover rounded-full '
                /></Link>
            <Link href={'/'} className={`text-xl ${session ? "text-(--primary)" : "text-black"} font-bold md:text-2xl md:font-extrabold lg:text-4xl`}>RideX</Link>
        </div>
            {/* navigation links */ }
    {
        session ? (<div className='flex gap-4 py-2 items-center justify-center'>
            <Link href={'/login'} className='text-black text-sm md:text-lg lg:text-xl hover:text-[#064E3B] hover:font-medium transition duration-300 px-2 py-1 rounded-full border border-gray-400'>
                Login
            </Link>
            <Link
                href={'/register'}
                className='text-black text-sm md:text-lg lg:text-xl hover:font-medium transition duration-300 hover:[#064E3B]  px-2 py-1 rounded-full border border-(var--primary)'
            >
                Sign Up
            </Link>
        </div>) : (
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bell-icon lucide-bell text-(--primary) cursor-pointer"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></svg>
            </div>
        )
    }
        </div >
    )
}

export default Nav