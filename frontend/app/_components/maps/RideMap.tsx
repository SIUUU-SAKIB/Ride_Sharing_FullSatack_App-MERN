'use client'
import React, { useEffect, useRef } from 'react'
import "maplibre-gl/dist/maplibre-gl.css"
import * as maplibregl from "maplibre-gl";
const RideMap = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`,
      center: [90.4125, 23.8103],
      zoom: 12,
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="w-full h-100 rounded-xl overflow-hidden"
    />
  );
};

export default RideMap