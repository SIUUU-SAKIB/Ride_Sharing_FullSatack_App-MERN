'use client'
import React from 'react'
import UserSolidIcon from '@iconify-react/basil/user-solid';
type PassengerSelectorProps = {
    value:number,
    onChange : (value:number) => void,
    min?:number,
    max?:number,
    vehicle?:string

}
const PassengerSelector = ({value, onChange,vehicle, min=1, max=6}:PassengerSelectorProps) => {
    const decrease = () => {
     if(value > min) {
        onChange(value - 1);
     }
    }  
    const increase = () => {
  
        onChange(value + 1);
    
    } 
    console.log(vehicle)
     return (
    <div className="flex items-center justify-between pt-4 px-2">
      {/* Left side */}
      <div className="flex items-center gap-4">
         <div className="p-2 bg-gray-200/70 rounded-full">
           <UserSolidIcon height="26" className='text-xl text-(--primary) ' />
         </div>
        <div>
          <p className="font-bold text-base">
            Passengers
          </p>
          <p className="text-xs text-gray-500">
            How many passengers?
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={decrease}
          disabled={value <= min}
          className="w-8 h-8 rounded-full bg-gray-100 text-lg font-bold
                     hover:bg-gray-200 transition cursor-pointer
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          −
        </button>

        <span className="w-5 text-center font-bold">
          {value}
        </span>

        <button
          type="button"
          onClick={increase}
          disabled={value >= max}
          className="w-8 h-8 rounded-full bg-gray-100 text-lg font-bold
                     hover:bg-gray-200 transition cursor-pointer
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default PassengerSelector