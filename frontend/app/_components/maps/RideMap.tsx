'use client'
import React, { useEffect, useRef } from 'react'
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
const RideMap = () => {
    const mapContainer = React.useRef<HTMLDivElement | null>(null)
    useEffect(() => {
     if(!mapContainer.current) return;
     const map = new maplibregl.Map({
       container:mapContainer.current,
       style:`https://api.maptiler.com/maps/nl-cartiqo-topo/?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`,
       center:[90.4125, 23.8103],
       zoom:12
     });
     return () => {
        map.remove()
     }
    },[])
  return (
    <div ref={mapContainer} className='w-full h-100 rounded-xl overflow-hidden'></div>
  )
}

export default RideMap