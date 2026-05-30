"use client"
import { Pen, Star, User, Mail } from "lucide-react"
import Image from "next/image"
import { useCurrentUser } from "../_hooks/useCurrentUser"


const UserProfile = () => {
  const { data } = useCurrentUser()
  const user = data?.data

  const personalInto = [
    {
      title: "Full Name", name: user?.name ? user?.name : "John Doe", icon: User
    },
    {
      title: "Email", name: user?.email ? user?.email : "johndoe123@gmail.com", icon: Mail
    },
    {
      title: "Phone Number", name: user?.phoneNumber ? user?.phoneNumber : '0179642425455325', icon: Mail
    }, {
      title: "Base Location", name: user?.location ? user?.location : "Masimpur, Sylhet", icon: Mail
    }
  ]

  return (
    <div className="max-w-5xl flex flex-col pt-8 mx-auto pb-20 px-4">
      {/* top profile */}
      <div className="flex flex-col justify-center items-center w-full">
        <Image
          alt="Profile image"
          width={600}
          height={600}
          src={'/demo_profile.jpg'}
          className="rounded-full w-50 h-50 object-cover border-4 border-white mb-8"
        />
        <div className="flex flex-col gap-2 items-center justify-center">
          <h3 className="font-bold text-2xl">Aminul islam sakib</h3>
          <p className="text-(--neutral) font-medium text-md">sakib123@gmail.com</p>
          <div className="flex gap-4 pt-2">
            <div className="flex gap-1 items-center justify-center bg-(--primary)/40 rounded-full py-2 px-4">
              <Star className="text-xs fill-green-500 text-transparent " />
              <p className="text-sm font-semibold text-black/70">Premium Rider</p>

            </div>
            <p className="text-sm py-2 bg-(--neutral)/30 font-semibold text-black/60 rounded-full text-center px-4">Verified Account</p>
          </div>
        </div>
      </div>
      {/*personal information  */}
      <div className="pt-4 flex items-start justify-center gap-2 flex-col ">
        <p className="font-bold text-2xl pb-2">Personal Information</p>
        {
          personalInto.map(e => <div key={e.name} className="p-6 bg-white rounded-md flex gap-4 justify-between w-full items-center">

            <div className="flex gap-8 items-center ">
              <div className="p-4 bg-(--neutral)/10 rounded-full">
                {e.icon && <e.icon className="text-(--primary) text-xl" />}
              </div>
              <div className="flex flex-col gap-1 items-start">
                <p className="text-md text-(--neutral) font-medium">{e.title}</p>
                <h1 className="text-xl font-bold">{e.name}</h1>
              </div>
            </div>
            <Pen className="text-xl text-(--primary)" />
          </div>)
        }
      </div>
      {/* account status */}
            <div className="pt-4 flex items-start justify-center gap-2 flex-col w-full rounded-md" >
               <p className="font-bold text-2xl pb-2 ">Account information</p>
              <div className="shadow-sm w-full bg-white rounded-md">
                <div className="p-6 flex gap-4 justify-between items-center">
              <p className="text-md text-(--neutral)">status</p>
              <div className="flex gap-1 items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-green-900"></div>
                <p className="text-md font-semibold text-(--primary)">Active</p>
              </div>
            
              </div>

              <div className="p-6 flex gap-4 justify-between  items-center">
              <p className="text-sm text-(--neutral)">Join Date</p>
              <p className="text-(--neutral)">Oct 24, 2023</p>
              </div>
              </div>
            </div>
    </div>
  )
}

export default UserProfile