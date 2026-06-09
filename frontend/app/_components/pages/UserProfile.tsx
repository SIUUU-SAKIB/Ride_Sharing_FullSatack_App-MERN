"use client"
import { Pen, Star, User, Mail, LockKeyholeOpen, LogOut, Phone, MapPin, CarTaxiFront } from "lucide-react"
import Image from "next/image"
import { useCurrentUser } from "../../_hooks/useCurrentUser"
import { useLogout } from "../../_hooks/useLogout"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MdOutlineVerified } from "react-icons/md"

const UserProfile = () => {
  const router = useRouter()
  const { data, isLoading, isError } = useCurrentUser()
  const user = data?.data
  const logoutMutation = useLogout()
  const personalInto = [
    {
      title: "Full Name", name: user?.name ? user?.name : "John Doe", icon: User
    },
    {
      title: "Email", name: user?.email ? user?.email : "johndoe123@gmail.com", icon: Mail
    },
    {
      title: "Phone Number", name: user?.phoneNumber ? user?.phoneNumber : '0179642425455325', icon: Phone
    }, {
      title: "Base Location", name: user?.baseLocation ? user?.baseLocation : "Not given", icon: MapPin
    }
  ]

  return (
    <div className="max-w-5xl pt-8 mx-auto pb-28 px-4">
      {/* top profile */}
      <div className="flex flex-col justify-center items-center w-full">
        <Image alt="Profile image"
          width={600}
          height={600}
          src={user?.profilePhoto || "/demo_profile.jpg"}
          className="rounded-full w-32 h-32 md:w-40 md:h-40 lg:w-50 lg:h-50 object-cover border-2 border-white mb-6"
        />
        <div className="flex flex-col gap-2 items-center justify-center">
          <h3 className="font-bold text-xl md:text-2xl text-center">{user?.name}</h3>
          <p className="text-(--neutral) font-medium text-sm md:text-md break-all text-center">{user?.email}</p>
          <div className="flex items-center justify-center gap-4 pt-2">
            {
              user?.role !== `DRIVER` &&(
                <Link href={`/driver/registration`} className="flex gap-2 items-center justify-center rounded-full py-2 px-4 bg-(--primary) ">
              <CarTaxiFront className="text-xs text-white text-shadow-xs" />
              <p className="text-sm font-semibold text-white text-shadow-xs">Become a Driver?</p>

            </Link>
              )
            }
          {user?.isVerified ? (  <div className="flex gap-2 items-center justify-center rounded-full py-2 px-4 border-(--primary) border bg-white ">
              <MdOutlineVerified className="text-(--primary) text-xl" />
              <p className="text-sm bg-(--)/30 font-semibold text-(--primary) rounded-full text-center">Verified Account</p>
            </div>):(  <div className="flex gap-2 items-center justify-center rounded-full py-2 px-4 border-zinc-100 bg-zinc-200 ">
              <MdOutlineVerified className="text-(--neutral) text-xl" />
              <p className="text-sm bg-(--)/30 font-semibold text-(--neutral) rounded-full text-center">Verified Account</p>
            </div>)}

          </div>
        </div>
      </div>
      {/*personal information  */}
      <div className="pt-4 flex items-start justify-center gap-2 flex-col ">
        <p className="font-bold text-xl sm:text-2xl pt-8 pb-2" >Personal Information</p>
        {
          personalInto.map(e => <div key={e.name} className="p-6 bg-white rounded-md flex gap-4 justify-between w-full items-center">

            <div className="flex gap-8 items-center ">
              <div className="p-4 bg-(--neutral)/10 rounded-full">
                {e.icon && <e.icon className="text-(--primary) text-xl" />}
              </div>
              <div className="flex flex-col gap-1 items-start">
                <p className="text-md text-(--neutral) font-medium">{e.title}</p>
                <h1 className="text-md md:text-xl font-bold break-all">{e.name}</h1>
              </div>
            </div>

            <Pen onClick={() => console.log(`clicked`)} className={`text-xl text-(--primary) cursor-pointer ${e.title === "Email" ? "hidden" : "block"}`} />
          </div>)
        }
      </div>
      {/* account status */}
      <div className="pt-4 flex items-start justify-center gap-2 flex-col w-full rounded-md" >
        <p className="font-bold text-xl sm:text-2xl pt-8 pb-2">Account information</p>
        <div className="shadow-sm w-full bg-white rounded-md">
          <div className="p-6 flex gap-4 justify-between items-center">
            <p className="text-lg text-(--neutral)">status</p>
            <div className="flex gap-1 items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-green-900"></div>
              <p className={`text-md font-semibold  ${!data?.data.isVerified? "text-(--neutral)" : "text-(--primary)" }`}>{!data?.data.isVerified ? "Not verified" : "Active"}</p>
            </div>

          </div>

          <div className="p-6 flex gap-4 justify-between  items-center">
            <p className="text-lg text-(--neutral)">Join Date</p>
            <p className="text-(--neutral)">Oct 24, 2023</p>
          </div>
          <div className="p-6 flex gap-4 justify-between  items-center">
            <div className="flex gap-2 items-center justify-center">
              <LockKeyholeOpen className="text-(--neutral)/60 text-lg" />
              <p className="text-lg text-(--neutral)">Password</p>
            </div>

            <Link href={'/user/change_password'} className="text-(--primary) font-semibold">Change</Link>
          </div>
        </div>
      </div>
      <button onClick={() => logoutMutation.mutate()} className="w-full items-center justify-center flex gap-2 mt-4 py-4 bg-red-200 text-center mx-auto rounded-lg cursor-pointer hover:bg-red-300/60 transition duration-100">
        <LogOut className="text-lg text-red-600" />
        <p className="text-red-600 text-xl">Logout</p>
      </button>
    </div>
  )
}

export default UserProfile