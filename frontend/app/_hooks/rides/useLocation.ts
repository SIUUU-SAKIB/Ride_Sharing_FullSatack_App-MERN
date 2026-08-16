"use client"
import { Location } from "@/app/_types/location";
import React, { useEffect } from "react"

const useLocation = () => {
  const [location, setLocation] = React.useState<Location | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)

  const getCurrentLocation = React.useCallback(() => {
    if (!navigator.geolocation) {

      setError('Geolocation is not supported in this browser')
      setLoading(false)
      return;
    }
    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        }
        setLocation(newLocation)
        setLoading(false)
      },
      (error) => {
        console.log("Locatoin error", error)
        setError(error.message)
        setLoading(true)
      }, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    }
    )
 
  }, [])
  useEffect(() => {
    getCurrentLocation()
  }, [getCurrentLocation])
  return {
    location,
    loading,
    error,
    getCurrentLocation
  }
}

export default useLocation