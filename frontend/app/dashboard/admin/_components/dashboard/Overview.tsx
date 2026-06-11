"use client"
import { FaRegNewspaper } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { IoPeopleSharp } from "react-icons/io5";
import { PiCarSimpleBold } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { TrendingUp } from "lucide-react";
const Overview = () => {
  const overviewItems = [
    {
      name: "Pending Drivers", icon: FaRegNewspaper, total: 12, today: 12
    },
    {
      name: "Approved Drivers", icon: FcApproval, total: 12, today: 12
    },
    {
      name: "Total Riders", icon: IoPeopleSharp, total: 12, today: 12
    },
    {
      name: "Pending Drivers", icon: FaRegNewspaper, total: 12, today: 12
    },
    {
      name: "Active Rides", icon: PiCarSimpleBold, total: 12, today: 12
    },
    {
      name: "Revenue Today", icon: FaRegMoneyBillAlt, total: 12, today: 12
    },
  ]
  return (
    <div className="grid grid-cols-6 w-full items-center gap-4">
     {
      overviewItems.map((item) => (
        <div key={item.name} className="flex col-span-1 flex-col gap-2 p-2 bg-white rounded-xl">
          <div className="flex justify-between items-center">
            <p className="text-(--neutral)">{item.name}</p>
            <div className="p-1 bg-red-100/50 rounded-l-full">
            {item.icon && <item.icon></item.icon>}</div>
          </div>
          <p className="text-xl font-semibold">{item.total}</p>
          <div className="flex items-center gap-2">
            <TrendingUp className="text-green-500 text-lg" />
           <p className="text-red-500">{item.today} today</p>
          </div>
        </div>
      ))
     }
    </div>
  )
}

export default Overview