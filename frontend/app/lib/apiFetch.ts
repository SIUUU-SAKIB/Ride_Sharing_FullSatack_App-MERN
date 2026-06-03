import { Authentication } from "../_services/auth"

let isRefreshing = false

export const apiFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
) => {
  let response = await fetch(input, {
    ...init,
    credentials: "include",
  })
  if (response.status !== 401) {
    return response
  }
  try {
    if (!isRefreshing) {
      isRefreshing = true
      await Authentication.refreshToken()
      isRefreshing = false
    }
    response = await fetch(input, {
      ...init,
      credentials: "include",
    })
    return response
  } catch (error) {
    isRefreshing = false
    // if (typeof window !== "undefined") {
    //   window.location.href = "/login"
    // }
    throw error
  }
}