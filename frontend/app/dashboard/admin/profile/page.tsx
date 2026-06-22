import React from 'react'
import Profile from '../_components/profile/Profile'
import Information from '../_components/profile/Information'
import Cards from '../_components/profile/Cards'

const AdminProfile = () => {
  return <div className='min-w-7xl mx-auto p-8'>
    <Information />
    <Cards/>
  </div>
}

export default AdminProfile