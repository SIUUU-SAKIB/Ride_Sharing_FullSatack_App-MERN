import { Place } from "@/app/_types/location"

export const searchLocation = async (query: string) => {
  if (!query) {
    return []
  }
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY
  if (!apiKey) {
    console.log(`Maptiler api key missing`)
    return []
  }
  try {
    const response = await fetch(`https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${apiKey}`)
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
      return places
  } catch (error) {
    console.log(`Failed to search location`)
    return []
  }
}