'use client'

import { CircleSmall, MapPin } from "lucide-react"
import { useState } from "react"
const LocationForm = () => {
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    console.log(from, to)
  return (
    <form className="flex flex-col gap-2">
        <div  className="flex gap-4 items-center bg-gray-100 rounded-md py-4">
            <CircleSmall size={50} strokeWidth={3} className="text-(--primary) text-2xl"/>
            <input value={from} onChange={(e) => setFrom(e.target.value)} name="from" type="text" placeholder="Current Location" py-4 px-2 className="text-black text-xl outline-none border-none"/>

        </div>

          <div  className="flex gap-6 items-center bg-gray-100 rounded-md px-2 py-4">
            <MapPin size={35} strokeWidth={1} className="text-red-500 text-2xl "/>
            <input value={to} onChange={(e) => setTo(e.target.value)} name="from" type="text" placeholder="Where to?" py-4 px-2 className="text-black text-xl outline-none border-none"/>

        </div>
    </form>
  )
}
export default LocationForm
