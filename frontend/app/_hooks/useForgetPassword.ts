import { useMutation } from "@tanstack/react-query"
import { Authentication } from "../_services/auth"

export const useForgetPassword = () => {
    return useMutation({
        mutationFn:Authentication.forgetPassword
    })
}