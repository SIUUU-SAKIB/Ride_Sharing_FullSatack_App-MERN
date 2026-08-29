'use client'
import React from 'react'
import UserOutlinedIcon from '@iconify-react/ant-design/user-outlined';
type PassengerSelectorProps = {
    value:number,
    onChange : (value:number) => void,
    min?:number,
    max?:number

}
const PassengerSelector = ({value, onChange, min=1, max=6}:PassengerSelectorProps) => {
    const decrease = () => {
     if(value > min) {
        onChange(value - 1);
     }
    }  
    const increase = () => {
  
        onChange(value + 1);
    
    } 
     return (
    <div className="flex items-center justify-between pt-4">
      {/* Left side */}
      <div className="flex items-center gap-4">
          <UserOutlinedIcon height="28" className='text-xl text-(--primary)' />
    

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