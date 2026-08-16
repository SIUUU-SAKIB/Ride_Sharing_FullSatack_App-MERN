export type RideMapProps = {
  location : {
    latitude:number,
    longitude:number,
    accuracy:number
  } | null
}

export type Location = {
  latitude: number,
  longitude: number,
  accuracy: number
}

export type Place = {
  address:string,
  latitude:number,
  longitude:number
}