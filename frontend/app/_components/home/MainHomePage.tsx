"use client";

import RadioIcon from "@iconify-react/formkit/radio";
import PenIcon from "@iconify-react/lucide/pen";
import SearchIcon from '@iconify-react/material-symbols-light/search';
import CrossOutlineIcon from '@iconify-react/bitcoin-icons/cross-outline';
import RadioIcon as radio from '@iconify-react/akar-icons/radio';
import React from "react";
const MainHomePage = () => {
  const [locationToggle, setLocationToggle] = React.useState<boolean>
    (false)
  console.log(locationToggle)
  return (
    <div className="w-full flex flex-col bg-white rounded-xl px-4 py-4">
      {/* pickup */}
      <div className="flex items-center justify-between border-b border-gray-200 py-4">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-(--neutral) text-md">PICKUP</p>

          <div className="flex items-center justify-between ">
            {
              !locationToggle ? (<div className="flex gap-2 items-center"> <RadioIcon height="24" className="text-(--primary)" />
                <p className="text-lg font-bold cursor-pointer">Current Location</p></div>
              ) : (<input placeholder="Picup Location" className="border-none outline-none" />)
            }
            {
              locationToggle ? (<button onClick={() => {
                setLocationToggle(false)
              }} className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
                <CrossOutlineIcon height="28" />

              </button>) : (<button onClick={() => {
                setLocationToggle(true)
              }} className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
                <PenIcon height="22" />

              </button>)
            }

          </div>
        </div>

      </div>
      {/* destination */}
      <div className="flex items-center gap-4 border-cd border-gray-200 py-4">
        <SearchIcon height="28" />
        <div>
          <p className="text-md text-zinc-600">DESTINATION</p>
          <input placeholder="Where to go?" className="border-none outline-none w-full text-(--neutral) pt-2" />
        </div>
      </div>
    </div>
  );
};

export default MainHomePage;