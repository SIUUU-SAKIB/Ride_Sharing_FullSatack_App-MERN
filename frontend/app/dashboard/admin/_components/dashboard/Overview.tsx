"use client"
import { FaRegNewspaper } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { IoPeopleSharp } from "react-icons/io5";
import { PiCarSimpleBold } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { TrendingUp } from "lucide-react";
import Link from "next/link"
const Overview = () => {
  const overviewItems = [
    {
      id:1, name: "Pending Drivers", icon: FaRegNewspaper, total: 12, today: 12, href:""
    },
    {
      id:2, name: "Approved Drivers", icon: FcApproval, total: 12, today: 12, href:""
    },
    {
      id:3, name: "Total Riders", icon: IoPeopleSharp, total: 12, today: 12, href:""
    },
    {
      id:4, name: "Active Rides", icon: FaCheck, total: 12, today: 12, href:""
    },
    {
      id:5, name: "Completed (Today)", icon: PiCarSimpleBold, total: 12, today: 12, href:""
    },
    {
      id:6, name: "Revenue Today", icon: FaRegMoneyBillAlt, total: 12, today: 12, href:""
    },
  ]
  return (
  <div className="grid grid-cols-4 md:grid-cols-6 gap-4 pt-4">
  {overviewItems.map(({id, name, total, today, icon, href}) => (
    <div
      key={id}
      className="flex flex-col gap-3 p-4 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center justify-between">
        <Link href={href} className="text-sm text-(--neutral)">
          {name}
        </Link>

        <div className={`p-2 rounded-full 
          ${name === "Pending Drivers" && "bg-red-200/50"}
          ${name === "Approved Drivers" && "bg-green-200/50"}
          ${name === "Total Riders" && "bg-zinc-200/50"}
          ${name === "Active Rides" && "bg-green-200/60"}
          ${name === "Completed (Today)" && "bg-blue-200/50"}
          ${name === "Revenue Today" && "bg-zinc-900/20"}
          `}>
          {icon && (() => {
              const Icon = icon as any
              return <Icon className="text-sm" />
            })()}
        </div>
      </div>

      <h2 className="text-2xl font-bold">
        {total}
      </h2>

      <div className="flex items-center gap-1">
        <TrendingUp className="text-green-500 size-4" />
        <p className="text-sm text-green-500">
          +{today} today
        </p>
      </div>
    </div>
  ))}
</div>
  )
}

export default Overview