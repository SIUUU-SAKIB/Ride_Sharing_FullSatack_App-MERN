'use client'
import React from 'react'
import UserSolidIcon from '@iconify-react/basil/user-solid';
type PassengerSelectorProps = {
  value: number,
  onChange: (value: number) => void,
  vehicle?: string,
  min?: number,
  onLimitReached: (message: string) => void

}
const PassengerSelector = ({ value, onChange, vehicle, onLimitReached, min = 1 }: PassengerSelectorProps) => {
  const [message, setMessage] = React.useState<string | null>(null)
  const getMaxPassengers = (vehicle: string | undefined) => {
    switch (vehicle) {
      case "BIKE":
        return 1;
      case "CNG":
        return 3;
      case "CAR":
        return 6

      default:
        return 1

    }
  }
  const maximum = getMaxPassengers(vehicle)

  const decrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  }
  const increase = () => {
    if (value >= maximum) {
      onLimitReached(`Maximum ${maximum} passenger allowed for ${vehicle}`)
      return;
    }
    onChange(value + 1);
  }
  React.useEffect(() => {
    if (value > maximum) {
      onChange(maximum);
    }
  }, [vehicle, maximum, value, onChange]);
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
          disabled={value === 6}
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