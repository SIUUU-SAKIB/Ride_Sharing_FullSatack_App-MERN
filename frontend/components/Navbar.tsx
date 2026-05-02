"use client"
import React, { useState } from 'react'
const Navbar = () => {
    const [counter, setCounater] = useState(0)
  return (
    <div className='mx-auto w-[600px] h-[400px] flex items-center justify-center gap-4'>
        <button onClick={() => setCounater(counter - 1)} className='text-xl font-bold'>Decrease</button>
        <p className='text-2xl font-bold'>{counter}</p>
        <button onClick={() => setCounater(counter + 1)} className='text-xl font-bold'>Increase</button>
    </div>

  )
}

export default Navbar