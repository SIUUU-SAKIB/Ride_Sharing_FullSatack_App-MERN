"use client";
import ConfirmedLocation from "@iconify-react/formkit/radio";
import UnconfirmedLocation from '@iconify-react/akar-icons/radio';
import PenIcon from "@iconify-react/lucide/pen";
import SearchIcon from '@iconify-react/material-symbols-light/search';
import CrossOutlineIcon from '@iconify-react/bitcoin-icons/cross-outline';
import LocationThinIcon from '@iconify-react/iconamoon/location-thin';
import React, { useState } from "react";
import { useCurrentUser } from "@/app/_hooks/useCurrentUser";
import BikeIcon from '@iconify-react/mdi/bike';
import CarIcon from '@iconify-react/mdi/car';
import { TbCurrencyTaka } from "react-icons/tb";
import MonorailTransitVehicleWithDestinationDisplayIcon from '@iconify-react/pinhead/monorail-transit-vehicle-with-destination-display';
import { FaArrowRight, FaMoneyBills } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";
import { BiSolidCoupon } from "react-icons/bi";
import useLocation from "@/app/_hooks/rides/useLocation";
import { Place } from "@/app/_types/location";
import { getTimeOfDay } from "./helper/getTimeOfDay";
import { getAddressFromCoordinates, searchLocation } from "./helper/searchLocation";


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

  // HOOKS=============
  const {
    location,
    loading,
    error,
    getCurrentLocation,
  } = useLocation();
  const { data: user } = useCurrentUser()
  // STATES=========
  const [locationToggle, setLocationToggle] = React.useState<boolean>
    (false)
  const [confirmLocation, setConfirmLocation] = React.useState<boolean>(false)
  const [selectedVehicle, setSelectedVehicle] = React.useState<string>(vehicleInfo[0]?.title)
  const [paymentMethod, setPaymentMethod] = React.useState<string>('Cash')

  //PICKUP 
  const [pickupQuery, setPickupQuery] = React.useState<string>('')
  const [pickupResults, setPickupResults] = React.useState<Place[]>([]);
  const [pickupLocation, setPickupLocation] = React.useState<Place | null>(null)
  // DESTINATION
  const [destinationQuery, setDestinationQuery] = React.useState<string>("");
  const [destinationResults, setDestinationResults] =
    React.useState<Place[]>([]);
  const [destinationLocation, setDestinationLocation] = React.useState<Place | null>(null);
  // BUTTONS============
  const currentLocationBtn = () => {
     getCurrentLocation();
    confirmLocation ? setConfirmLocation(false) : setConfirmLocation(true)
  }

React.useEffect(() => {
  if (!location) {
    console.log("No location found");
    return;
  }

  const updatePickupLocation = async () => {
    const place = await getAddressFromCoordinates(
      location.latitude,
      location.longitude
    );
    if (place) {
      setPickupLocation(place);
    }
  };

  updatePickupLocation();
}, [location]);
console.log(pickupLocation)
  return (
    <div className="w-full">
      <p className="text-xl font-bold py-2 text-shadow-2xs">Good {getTimeOfDay()}, {user?.data?.name}</p>
      {/* <div className="py-8">
        {
          loading ? (<p className="text-xl text-(--primary)">Loading Map....</p>) : (<RideMap location={location} />)
        }
      </div> */}
      <div className="w-full flex flex-col bg-white rounded-xl px-4 py-2">
        {/* pickup */}
        <div className="flex items-center justify-between border-b border-gray-200 py-4">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-(--neutral) text-md">
              PICKUP
            </p>

            <div className="flex items-center justify-between">
              {!locationToggle ? (
                <button
                  type="button"
                  onClick={currentLocationBtn}
                  disabled={loading}
                  className="flex gap-2 items-center cursor-pointer disabled:cursor-wait disabled:opacity-60"
                >
                  {confirmLocation ? (
                    <ConfirmedLocation
                      height="24"
                      className="text-(--primary)"
                    />
                  ) : (
                    <UnconfirmedLocation
                      height="24"
                      className="text-(--primary)"
                    />
                  )}
                  <p className="text-lg font-bold">
                   {
                    loading ? "Getting current location" : "Current location"
                   }
                  </p>
                </button>
              ) : (
                <div className="flex gap-2 items-center w-full">
                  <LocationThinIcon height="30" />

                  <input
                    autoFocus
                    value={pickupQuery}
                    onChange={(e) => {
                      setPickupQuery(e.target.value)

                    }}
                    onKeyDown={async (e) => {
                      if (e.key === `Enter`) {
                        const results = await searchLocation(pickupQuery);
                        setPickupResults(results)
                      }
                    }}
                    placeholder="Pickup Address"
                    className="border-none outline-none flex-1"
                  />
                </div>
              )}

              {locationToggle ? (
                <button
                  type="button"
                  onClick={() => {
                    setLocationToggle(false);
                  }}
                  className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
                >
                  <CrossOutlineIcon height="28" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setLocationToggle(true);
                    setConfirmLocation(false);
                  }}
                  className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
                >
                  <PenIcon height="22" />
                </button>
              )}
            </div>
            {/* pickup results */}
            {
              pickupResults.length > 0 || pickupLocation && (
                <div className="mt-3 flex flex-col gap-1">
                  {pickupResults.map((place, index) => (
                    <button
                      key={`${place.latitude}--${place.longitude}--${index}`}
                      type="button"
                      onClick={() => {
                        setPickupLocation(place)
                        setPickupQuery(place.address)
                        setPickupResults([])
                        setLocationToggle(false)
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-100"
                    >
                      <p className="font-medium text-sm text-black">{place.address}</p>
                      
                    </button>
                  ))}
                </div>
              )
            }
          </div>
        </div>
        {/* destination */}
        <div className="flex flex-col gap-2 border-cd border-gray-200 py-4">

          <p className="text-md text-(--neutral)">
            DESTINATION
          </p>

          <div className="flex gap-2 items-center w-full">
            <SearchIcon height="28" />

            <input
              autoFocus
              value={destinationQuery}
              onChange={(e) =>
                setDestinationQuery(e.target.value)
              }
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  const results = await searchLocation(destinationQuery);

                  setDestinationResults(results);
                }
              }}
              placeholder="Where to go?"
              className="border-none outline-none flex-1"
            />
          </div>
          {
            destinationResults.length > 0 && (
              <div className="mt-3 flex flex-col gap-1">
                {destinationResults.map((place, index) => (
                  <button
                    key={`${place.latitude}--${place.longitude}--${index}`}
                    type="button"
                    onClick={() => {
                      setDestinationLocation(place)
                      setDestinationQuery(place.address)
                      setDestinationResults([])
                      setLocationToggle(false)

                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100"
                  >
                    <p className="font-medium text-sm text-black">{place.address}</p>
                  </button>
                ))}
              </div>
            )
          }
        </div>
      </div>
      {/* 2nd part */}
      {/* vehicles */}
      <div className="bg-white px-4 py-8 rounded-2xl mt-8">
        <div className="flex items-center justify-center flex-wrap gap-2 max-w-7xl mx-auto">
          {
            vehicleInfo.map((vehicle, index) => <div onClick={() => setSelectedVehicle(vehicle.title)} key={index} className={`
      flex flex-col bg-gray-100 shadow-xs flex-1 
      rounded-2xl
      gap-2
      px-2
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
                height="40"
                className={`
        mx-auto my-4
        ${selectedVehicle === vehicle.title
                    ? "text-(--primary)"
                    : "text-black"
                  }
      `}
              />
              <div>
                <p className="text-md font-bold">{vehicle.title}</p>
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
        {/* vehicles end */}

        {/* payment method */}
        <div className="flex gap-4 items-center justify-between p-2 mt-8">
          <div className="flex gap-2 items-center">
            <div className="p-2 bg-gray-200/70 rounded-full"><FaMoneyBills className="text-2xl text-(--primary)" /></div>
            <div className="flex flex-col">
              <p className="text-md font-bold">Payment Method</p>
              <p className="text-xs text-(--neutral)">{paymentMethod === "Cash" && "Payment on destination" || paymentMethod === "Card" && "Payment via Card" || paymentMethod === "Bkash" && "Payment via Bkash"}</p>
            </div>
          </div>

          <div className="relative inline-flex items-center">
            <select
              defaultValue={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="appearance-none bg-transparent border-none outline-none
               text-sm font-medium cursor-pointer pr-5"
            >
              <option value="Cash">Cash</option>
              <option value="Bkash">bKash</option>
              <option value="Card">Card</option>
            </select>

            <ChevronDown
              size={14}
              className="absolute right-1 pointer-events-none text-gray-600"
            />
          </div>

        </div>
        {/* payment method end */}
        {/*coupon  */}
        <div className="py-1 px-2 flex gap-2 items-center justify-between bg-gray-100 rounded-full mt-2">
          <div className="flex gap-2 items-center">
            <div className="p-2 bg-white rounded-full">
              <BiSolidCoupon className="text-(--primary) text-2xl" />
            </div>
            <p className="text-md font-bold">Coupon</p>
          </div>
          <ChevronDown />
        </div>
        {/* coupon end */}
        {/* button */}
        <div onClick={() => { console.log(`clicked`) }} className="bg-(--primary) rounded-full w-full shadow-(--primary) py-4 px-2 text-white flex items-center gap-4 justify-center my-4 cursor-pointer hover:bg-(--primary)/90"><p className="text-xl font-bold">Request Ride</p> <FaArrowRight className="text-xl" /></div>
        {/* button end */}
      </div>
    </div>

  );
};

export default MainHomePage;