"use client"

import { useCurrentUser } from "@/app/_hooks/useCurrentUser"
import Image from "next/image"
import Link from "next/link"
import { MdDashboard, MdOutlinePayment } from 'react-icons/md'
import { FaUserCircle } from "react-icons/fa";
import { PiCarSimpleThin } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { GiPaperClip } from "react-icons/gi"
import { IoSettingsOutline } from "react-icons/io5";
import { usePathname } from "next/navigation"
const Sidebar = () => {
    const { data, isLoading } = useCurrentUser()
    const pathname = usePathname()
    const user = data?.data
    const navItems = [
        { id: 1, name: "Dashboard", icon: MdDashboard, href: "/dashboard/admin" },
        { id: 2, name: "Rides", icon: GiPaperClip, href: "/dashboard/admin/rides" },
        { id: 3, name: "Drivers", icon: PiCarSimpleThin, href: "/dashboard/admin/drivers" },
        { id: 4, name: "Riders", icon: CiUser, href: "/dashboard/admin/riders" },
        { id: 5, name: "Payments", icon: MdOutlinePayment, href: "/dashboard/admin/payments" },
        { id: 6, name: "Settings", icon: IoSettingsOutline, href: "/dashboard/admin/settings" },
        { id: 7, name: "profile", icon: FaUserCircle, href: "/dashboard/admin/profile" }
    ]
    return (
        <div className='max-w-150 bg-white shadow-md flex flex-col
         gap-8 items-start py-4 px-8 min-h-screen'>
            <Link href="/" className="text-4xl font-bold text-(--primary)">RideX</Link>

            <div className="flex gap-2 items-center max-h-8">
                <Link href={'/user/profile'}>
                    <Image
                        width={500}
                        height={500}
                        alt="Profile Image"
                        src={user?.profilePhoto || "/demo_profile.jpg"}
                        className={`object-cover w-7 h-7  md:w-9 md:h-10 lg:w-12 lg:h-12 rounded-full`}
                    /></Link>
                <div className="flex flex-col ">
                    <p className="text-md font-medium">Ridex Admin</p>
                    <p className="text-(--neutral) font-mono">General Controller</p>
                </div>
            </div>
            {/* main links */}
            <ul className="flex flex-col gap-2 items-start w-full">
                {navItems.map((item) => {
                    const isActive = pathname === item.href

                    return (
                        <li key={item.id} className="w-full">
                            <Link
                                href={item.href}
                                className={`flex gap-4 items-center px-4 py-3 rounded-lg transition-colors duration-200
            ${isActive ? "bg-(--primary)/10 text-(--primary)" : "hover:bg-gray-100 text-(--neutral)"
                                    }`}
                            >
                                <item.icon
                                    className={`text-lg ${isActive ? "text-(--primary)" : "text-(--neutral)"
                                        }`}
                                />
                                <p
                                    className={`font-medium ${isActive ? "text-(--primary)" : "text-(--neutral)"
                                        }`}
                                >
                                    {item.name}
                                </p>
                            </Link>
                        </li>
                    )
                })}
            </ul>


        </div>
    )
}

export default Sidebar