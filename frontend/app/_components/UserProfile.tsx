"use client"
import React from 'react'


import { useCurrentUser } from '../_hooks/useCurrentUser'

const UserProfile = () => {
  const {data:User} = useCurrentUser()
  const user = User?.data
  return (
    <div>
      <h2  className="text-xl font-bold text-black">{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  )
}

export default UserProfile