import { useQuery } from "@tanstack/react-query"
import { Authentication } from "../_services/auth"

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: Authentication.getCurrentUser,
    retry: false
  })
}