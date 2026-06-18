import React from 'react'
type SearchResultProps = {
    searchDriver : string,
    status: string,
    vehicleType : string
}
const SearchResult = ({searchDriver, status, vehicleType} : SearchResultProps) => {
  return (
    <div className='w-120 h-120 bg-amber-200'>SearchResult</div>
  )
}

export default SearchResult