"use client";

import ConfirmedLocation from "@iconify-react/formkit/radio";
import UnconfirmedLocation from '@iconify-react/akar-icons/radio';
import PenIcon from "@iconify-react/lucide/pen";
import SearchIcon from '@iconify-react/material-symbols-light/search';
import CrossOutlineIcon from '@iconify-react/bitcoin-icons/cross-outline';
import LocationThinIcon from '@iconify-react/iconamoon/location-thin';
import React from "react";
import { useCurrentUser } from "@/app/_hooks/useCurrentUser";
import BikeIcon from '@iconify-react/mdi/bike';
import CurrencyTakaIcon from '@iconify-react/tabler/currency-taka';
import CarIcon from '@iconify-react/mdi/car';
import { TbCurrencyTaka } from "react-icons/tb";
import MonorailTransitVehicleWithDestinationDisplayIcon from '@iconify-react/pinhead/monorail-transit-vehicle-with-destination-display';
const getTimeOfDay = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Morning";
  } else if (hour >= 12 && hour < 17) {
    return "Afternoon";
  } else if (hour >= 17 && hour < 21) {
    return "Evening";
  } else {
    return "Night";
  }
};
const vehicleInfo = [
  {
    title: "Bike", distance: "3", fare: 170, icon: BikeIcon
  },
  {
    title: "CNG", distance: "6", fare: 130, icon: MonorailTransitVehicleWithDestinationDisplayIcon
  },
  {
    title: "Car", distance: "10", fare: 190, icon: CarIcon
  }
]
const MainHomePage = () => {
  const { data: user } = useCurrentUser()
  const [locationToggle, setLocationToggle] = React.useState<boolean>
    (false)
  const [confirmLocation, setConfirmLocation] = React.useState<boolean>(false)
  const [selectedVehicle, setSelectedVehicle] = React.useState<string | null>(null)
  return (
    <div className="w-full">
      <p className="text-xl font-bold py-2 text-shadow-2xs">Good {getTimeOfDay()}, {user?.data?.name}</p>
      <div className="w-full flex flex-col bg-white rounded-xl px-4 py-2">
        {/* pickup */}
        <div className="flex items-center justify-between border-b border-gray-200 py-4">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-(--neutral) text-md">PICKUP</p>

            <div className="flex items-center justify-between ">
              {
                !locationToggle ? (<div className="flex gap-2 items-center"> {confirmLocation ? (<ConfirmedLocation height="24" className="text-(--primary)" />) : (<UnconfirmedLocation height="24" className="text-(--primary)" />)}
                  <p onClick={() => confirmLocation ? setConfirmLocation(false) : setConfirmLocation(true)} className="text-lg font-bold cursor-pointer">Current Location</p></div>
                ) : (<div className="flex gap-2 items-center w-full">
                  <LocationThinIcon height="30" />
                  <input autoFocus placeholder="Picup Address" className="border-none outline-none flex-1" />
                </div>)
              }
              {
                locationToggle ? (<button onClick={() => {
                  setLocationToggle(false)
                }} className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
                  <CrossOutlineIcon height="28" />
                </button>) : (<button onClick={() => {
                  setLocationToggle(true)
                  setConfirmLocation(false)
                }} className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
                  <PenIcon height="22" />
                </button>)
              }
            </div>
          </div>

        </div>
        {/* destination */}
        <div className="flex flex-col gap-2 border-cd border-gray-200 py-4">

          <p className="text-md text-(--neutral)">DESTINATION</p>
          <div className="flex gap-2 items-center justify-center">
            <SearchIcon height="30" />
            <input autoFocus placeholder="Where to go?" className="border-none outline-none w-full" />
          </div>
        </div>
      </div>
      {/* 2nd part */}

      <div className="bg-white p-2 rounded-t-2xl mt-8">
        <div className="flex items-center justify-center flex-wrap gap-4 max-w-7xl">
          {/*  1st vehicle*/}
          {
            vehicleInfo.map((vehicle, index) => <div onClick={() => setSelectedVehicle(vehicle.title)} key={index} className={`
      flex flex-col
      bg-gray-100
      shadow-xs
      rounded-2xl
      gap-2
      px-4
      py-4
      border-2
      transition duration-150
      cursor-pointer

      ${selectedVehicle === vehicle.title
                ? "border-(--primary) bg-green-50 shadow-md"
                : "border-transparent hover:border-gray-200"
              }
    `}>
              <vehicle.icon
                height="44"
                className={`
        mx-auto my-4
        ${selectedVehicle === vehicle.title
                    ? "text-(--primary)"
                    : "text-zinc-600"
                  }
      `}
              />
              <div>
                <p className="text-lg font-bold">{vehicle.title}</p>
                <p className="text-xs text-(--neutral)">{vehicle.distance} min away</p>
                <div className="flex items-center">
                  <TbCurrencyTaka className={`${selectedVehicle === vehicle.title ? "text-(--primary)" : "text-black"} text-xl`} />
                  <p className={`text-md ${selectedVehicle === vehicle.title ? "text-(--primary)" : "text-black"} font-bold`}>{vehicle.fare}</p>
                  <p className="text-(--neutral) text-xs px-2">KM</p>
                </div>
              </div>
            </div>)
          }
        </div>
      </div>

    </div>

  );
};

export default MainHomePage;