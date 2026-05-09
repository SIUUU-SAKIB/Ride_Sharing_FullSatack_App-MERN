import Image from 'next/image'
import Link from 'next/link'
import {Bell} from "lucide-react"

const Nav = () => {
    const session = false
    return (
        <div className='min-w-screen-2xl bg-white h-14 px-4 md:px-12 py-8 md:py-8 flex items-center justify-between shadow-md z-10'>
            {/* logo container */}
            <div className='flex gap-2 py-2 items-center justify-center text-black '>
                {/* session === false */}
                <Link href='/'>
                <Image
                    src={session ? "/ronaldo.jpg" : "/car.png"}
                    alt='RideShare Logo'
                    width={500}
                    height={500}
                    className={`${session?"w-10 h-10 rounded-full object-cover" : "w-7 h-7"} md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain`}
                /></Link>
               {/* session ===true */}
            <Link href={'/'} className={`text-xl text-black} font-bold md:text-2xl md:font-extrabold lg:text-4xl ${session?"hidden":"block"} mt-2`}>RideX</Link>
        </div>
                    <Link href={'/'} className={`text-xl text-(--primary) : "text-black"} font-bold md:text-2xl md:font-extrabold lg:text-4xl ${session?"block":"hidden"}`}>RideX</Link>
            {/* navigation links */ }
    {
        !session ? (<div className='flex gap-4 py-2 items-center justify-center'>
            <Link href={'/login'} className='text-black text-sm md:text-md lg:text-lg hover:text-(--primary) hover:font-medium transition duration-300 px-4 py-1 lg:py-2 rounded-full border border-(--primary)'>
                Login
            </Link>
            <Link
                href={'/register'}
                className='text-black text-sm md:text-md lg:text-lg hover:font-medium transition duration-300 hover:bg-(--primary) hover:text-white  px-2 py-1 rounded-full border border-(--primary)'
            >
                Sign Up
            </Link>
        </div>) : (
            <div>
                <Bell className='text-(--primary) cursor-pointer"'/>
            </div>
        )
    }
        </div >
    )
}

export default Nav