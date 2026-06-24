import React from 'react'
import RiderFilters from '../_components/riders/RiderFilters'

const Riders = () => {
  return (
    <div className='min-w-7xl mx-auto py-8'>
      <div className='flex flex-col gap-2 py-2'>
        <h1 className='text-2xl font-bold'>Rider Applications</h1>
        <p className='text-(--neutral)'>Review and manage rider onboarding requests.</p>
      </div>
      {/* filters */}
      <RiderFilters/>
    </div>
  )
}

export default Riders