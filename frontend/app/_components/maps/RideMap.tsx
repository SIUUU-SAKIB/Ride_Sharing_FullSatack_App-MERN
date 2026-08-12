'use client'
import React from "react"
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
const RideMap = () => {
  const mapContainer = React.useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    if (!mapContainer.current) return;
    const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY
     if(!apiKey) {
      throw new Error(`apiKey misssing`)
     }
    maptilersdk.config.apiKey = apiKey

    const map = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [90.4125, 23.8103],
      zoom: 12
    });
    return () => {
      map.remove()
    }
  }, [])
  return (<div ref={mapContainer} className="w-full h-100 rounded-xl overflow-hidden" />)
}

export default RideMap