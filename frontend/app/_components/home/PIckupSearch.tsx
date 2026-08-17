'use client'
import { Place } from '@/app/_types/location'
import React from 'react'

type PickupSearchProps = {
  onLocationSelect: (place:Place) => void
  onClose : () => void
}
const PickupSearch = ({onLocationSelect, onClose}:PickupSearchProps) => {
   const [query, setQuery] = React.useState('')



  return (
   <div className="flex flex-col gap-3 w-full">
    <div className="flex items-center gap-2">
      <input
      autoFocus
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder='Pickup Address'
      className='border-none outline-none flex-1'
      />
      <button
      type='button'
      onClick={onClose}
     className='p-1 cursor-pointer'
      >
        X
      </button>
    </div>
      <div className="flex flex-col">
        {/* results */}
      </div>
   </div>
  )
}

export default PickupSearch