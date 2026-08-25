import { Place } from "@/app/_types/location"

export const searchLocation = async (query: string) => {
  console.log(query)
  if (!query) {
    return []
  }
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY
  if (!apiKey) {
    console.log(`Maptiler api key missing`)
    return []
  }
  try {
    const response = await fetch(
  `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json` +
  `?key=${apiKey}` +
  `&limit=10` +
  `&country=bd` +
  `&types=address,poi,neighbourhood,locality`)
    if (!response.ok) {
      throw new Error(`Failed to search location`)
    }
    const data = await response.json()
  const places: Place[] =
      data.features?.map((feature: any) => ({
        address: feature.place_name,
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
      })) ?? [];
      console.log(places)
      return places

  } catch (error) {
    console.log(`Failed to search location`)
    return []
  }
}
console.log(`FUCKIONG SHIT`)



export const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number)=>{
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
  if (!apiKey) {
    console.error("MapTiler API key is missing");
    return null;
  }
  
  try {
    const response = await fetch(
      `https://api.maptiler.com/geocoding/${longitude},${latitude}.json?key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to get address");
    }

    const data = await response.json();
    const feature = data.features?.[0];
    if (!feature) {
      return null;
    }
    return {
      address: feature.place_name,
      latitude,
      longitude,
    };
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return null;
  }
};