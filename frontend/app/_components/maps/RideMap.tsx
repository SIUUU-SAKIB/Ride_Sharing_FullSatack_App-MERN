'use client'
import React, { useEffect } from "react"
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import useLocation from "@/app/_hooks/rides/useLocation";

type RideMapProps = {
  location : {
    latitude:number,
    longitude:number,
    accuracy:number
  } | null
}

const RideMap = ({location}:RideMapProps) => {
  const mapContainer = React.useRef<HTMLDivElement | null>(null)
  const map = React.useRef<maptilersdk.Map | null> (null)
  const marker = React.useRef<maptilersdk.Marker | null> (null)


  React.useEffect(() => {
    if (!mapContainer.current) return;
    const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY
     if(!apiKey) {
      throw new Error(`apiKey misssing`)
     }
    maptilersdk.config.apiKey = apiKey

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [90.4125, 23.8103],
      zoom: 11
    });
    return () => {
      map.current?.remove();
      marker.current?.remove();
      map.current = null;
      marker.current = null;
    }
  }, [])

  useEffect(() => {
   if(location?.latitude === null ||
    location?.longitude === null ||
    !map.current
   ){
    return
   }
   if (!location || !map.current)return
   const userLocation:[number, number] = [location.longitude, location.latitude]
   map.current.flyTo({
    center:userLocation,
    zoom:15,
    speed:1.2
   })
   marker.current?.remove()
   marker.current = new maptilersdk.Marker({
      color: "#00C896",
    })
      .setLngLat(userLocation)
      .addTo(map.current);
  }, [location?.latitude, location?.longitude])
  return (<div ref={mapContainer} className="w-full min-h-62.5 max-h-87.5 rounded-xl overflow-hidden" />)
}

export default RideMap