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
      id:1, name: "Pending Drivers", icon: FaRegNewspaper, total: 12, today: 12
    },
    {
      id:2, name: "Approved Drivers", icon: FcApproval, total: 12, today: 12
    },
    {
      id:3, name: "Total Riders", icon: IoPeopleSharp, total: 12, today: 12
    },
    {
      id:4, name: "Active Rides", icon: FaCheck, total: 12, today: 12
    },
    {
      id:5, name: "Completed (Today)", icon: PiCarSimpleBold, total: 12, today: 12
    },
    {
      id:6, name: "Revenue Today", icon: FaRegMoneyBillAlt, total: 12, today: 12
    },
  ]
  return (
  <div className="grid grid-cols-4 md:grid-cols-6 gap-4 pt-4">
  {overviewItems.map((item) => (
    <div
      key={item.id}
      className="flex flex-col gap-3 p-4 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-(--neutral)">
          {item.name}
        </p>

        <div className={`p-2 rounded-full 
          ${item.name === "Pending Drivers" && "bg-red-200/50"}
          ${item.name === "Approved Drivers" && "bg-green-200/50"}
          ${item.name === "Total Riders" && "bg-zinc-200/50"}
          ${item.name === "Active Rides" && "bg-green-200/60"}
          ${item.name === "Completed (Today)" && "bg-blue-200/50"}
          ${item.name === "Revenue Today" && "bg-zinc-900/20"}
          `}>
          <item.icon className="text-sm"/>
        </div>
      </div>

      <h2 className="text-2xl font-bold">
        {item.total}
      </h2>

      <div className="flex items-center gap-1">
        <TrendingUp className="text-green-500 size-4" />
        <p className="text-sm text-green-500">
          +{item.today} today
        </p>
      </div>
    </div>
  ))}
</div>
  )
}

export default Overview