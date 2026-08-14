"use client"

import React from "react"
type location = {
  latitude:number,
  longitude:number,
  accuracy: number
}

const useLocation = () => {
  const [location, setLocation] = React.useState<Location | null>(null)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string>(null)

  const getCurrentLocation = React.useCallback(()=>{
    if
  })
}

export default useLocation