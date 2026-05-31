import { LoginPayload, OTPPayload, RegisterPayload } from "../_interfaces/auth.interface"

const registerUser = async (data: RegisterPayload) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('phone', data.phone)

    if (data.profilePhoto?.[0]) {
        formData.append('profileImage', data.profilePhoto[0])

    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/create`, {
        method: 'POST',
        body: formData,
        credentials: "include"

    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Registration failed`)
    }
    return response.json()
}

const loginUser = async (data: LoginPayload) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
    if (!response.ok) {

        const errorData =
            await response.json()

        throw new Error(
            errorData.message ||
            "Login failed"
        )
    }

    return response
}
const getCurrentUser = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Unauthorized")
    }

    return response.json()
}
const logoutUser = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
    })
    const data = await response.json()
    if (!response) {
        throw new Error(data.message || 'Logout Failed')
    }

    return data
}
const forgetPassword = async (
    email: string
) => {

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forget-password`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        }
    )
    const data = await response.json()
    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to send OTP"
        )
    }
    return data
}

const verifyOtp = async (payload: OTPPayload) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to change password')
    }
    return data
}
export const Authentication =
{
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    forgetPassword,
    verifyOtp
}