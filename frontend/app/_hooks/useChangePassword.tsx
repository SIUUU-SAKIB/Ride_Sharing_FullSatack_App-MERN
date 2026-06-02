import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Authentication } from '../_services/auth'

const useChangePassword = () => {
  return useMutation({
    mutationFn:Authentication.changePassword
  })
}

export default useChangePassword