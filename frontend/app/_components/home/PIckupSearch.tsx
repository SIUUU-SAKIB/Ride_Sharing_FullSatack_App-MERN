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
    <div>PIckupSearch</div>
  )
}

export default PickupSearch