'use client'

import { CircleSmall, MapPin } from "lucide-react"
const LocationForm = () => {
  return (
    <form className="flex w-full flex-col gap-2 bg-white px-4 py-4 rounded-lg">
      <div className="flex gap-4 w-full items-center bg-gray-100 rounded-md py-4">
        <CircleSmall size={50} strokeWidth={3} className="text-(--primary) text-2xl" />
        <input type="text" placeholder="Current Location" className="text-black text-xl outline-none w-full border-none" />

      </div>

      <div className="flex gap-4 items-center w-full bg-gray-100 rounded-md px-2 py-4">
        <MapPin size={35} strokeWidth={1} className="text-red-500 text-2xl " />
        <input type="text" placeholder="Where to?" className="text-black text-xl outline-none border-none" />

      </div>
    </form>

  )
}
export default LocationForm
