"use client"

import { useCurrentUser } from "@/app/_hooks/useCurrentUser"

import Services from "./Services"
import MainHomePage from "./MainHomePage"
import LocationForm from "./LocationForm"
import useLocation from "@/app/_hooks/rides/useLocation"

const HomeLayout = () => {
    const {
    location,
    loading,
    error,
    getCurrentLocation,
  } = useLocation();
    const { data: user } = useCurrentUser()

    return (
        <>
            {
                
                !user ? (
                    <><LocationForm />
                        <Services /></>) :
                    (<MainHomePage 
                    location={location}
                    currentLocationBtn={getCurrentLocation}/>)
            }
        </>
    )
}

export default HomeLayout