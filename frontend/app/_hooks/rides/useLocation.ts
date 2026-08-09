"use client"

import React, { useEffect, useState } from "react"
type Location ={
latitude:number, 
longitude:number
}

export const useLocation = () => {

    const [location, setLocation] = React.useState<Location | null>(null)
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string | null>(null)

    useEffect(() => {
    if(!navigator.geolocation) {
        setError(`Geolocation is not supported in this browser`)
    }
    }, [])
} 