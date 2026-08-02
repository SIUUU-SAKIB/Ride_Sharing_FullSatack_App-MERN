'use client'

import { CircleSmall, MapPin } from "lucide-react"
const LocationForm = () => {
  return (

    <form className="flex flex-col gap-2 max-w-md bg-white px-10 py-4 rounded-lg">
      <div className="flex gap-4 items-center bg-gray-100 rounded-md py-4">
        <CircleSmall size={50} strokeWidth={3} className="text-(--primary) text-2xl" />
        <input type="text" placeholder="Current Location" className="text-black text-xl outline-none  border-none" />

      </div>

      <div className="flex gap-4 items-center bg-gray-100 rounded-md px-2 py-4">
        <MapPin size={35} strokeWidth={1} className="text-red-500 text-2xl " />
        <input type="text" placeholder="Where to?" className="text-black text-xl outline-none border-none" />

      </div>
    </form>

  )
}
export default LocationForm
