"use client";

import ConfirmedLocation from "@iconify-react/formkit/radio";
import UnconfirmedLocation from '@iconify-react/akar-icons/radio';
import PenIcon from "@iconify-react/lucide/pen";
import SearchIcon from '@iconify-react/material-symbols-light/search';
import CrossOutlineIcon from '@iconify-react/bitcoin-icons/cross-outline';
import LocationIcon from '@iconify-react/tabler/location';
import LocationThinIcon from '@iconify-react/iconamoon/location-thin';
import React from "react";
const MainHomePage = () => {
  const [locationToggle, setLocationToggle] = React.useState<boolean>
    (false)
  const [confirmLocation, setConfirmLocation] = React.useState<boolean>(false)
  console.log(confirmLocation)
  return (
    <div className="w-full flex flex-col bg-white rounded-xl px-4 py-4">
      {/* pickup */}
      <div className="flex items-center justify-between border-b border-gray-200 py-4">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-(--neutral) text-md">PICKUP</p>

          <div className="flex items-center justify-between ">
            {
              !locationToggle ? (<div className="flex gap-2 items-center"> {confirmLocation ? (<ConfirmedLocation height="24" className="text-(--primary)" />) : (<UnconfirmedLocation height="24" className="text-(--primary)" />)}
                <p onClick={() => confirmLocation ? setConfirmLocation(false) : setConfirmLocation(true)} className="text-lg font-bold cursor-pointer">Current Location</p></div>
              ) : (<div className="flex gap-2 items-center">
                <LocationThinIcon  height="30" />
                <input placeholder="Picup Location" className="border-none outline-none" />
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
          <input placeholder="Where to go?" className="border-none outline-none w-full" />
        </div>
      </div>
    </div>
  );
};

export default MainHomePage;