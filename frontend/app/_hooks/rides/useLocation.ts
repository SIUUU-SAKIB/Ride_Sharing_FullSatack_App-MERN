"use client"

import React, { useEffect, useState } from "react"
type Location = {
    latitude: number,
    longitude: number
}

export const useLocation = () => {

    const [location, setLocation] = React.useState<Location | null>(null)
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string | null>(null)

    useEffect(() => {
        if (!navigator.geolocation) {
            setError(`Geolocation is not supported in this browser`)
            setLoading(false)
            return
        }

       navigator.geolocation.getCurrentPosition(
        (position) => {
            setLocation({
                latitude:position.coords.latitude,
                longitude:position.coords.longitude
            });
            setLoading(false)
        },
        (error) => {
            setError(error.message);
            setLoading(false)
        },
        {
            enableHighAccuracy:true,
            timeout:10000,
            maximumAge:30000
        }

       );


    }, [])

    return{
        location, loading, error
    }
} 