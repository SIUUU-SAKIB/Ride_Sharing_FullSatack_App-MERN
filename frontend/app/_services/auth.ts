export interface RegisterPayload {
    name: string,
    email: string,
    password: string,
    phone: string,
    profilePhoto?: FileList
}
export interface LoginPayload {
    email: string,
    password: string
}
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
export const Authentication = { registerUser, loginUser, getCurrentUser }