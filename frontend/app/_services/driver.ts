import { DriverApplicationPayload } from "../_interfaces/driver.interface"

const driverApplication = async (payload: DriverApplicationPayload) => {
    const formData = new FormData()

    formData.append("licenseNumber", payload.licenseNumber)
    formData.append("vehicleNumber", payload.vehicleNumber)
    formData.append("licenseImage", payload.licenseImage)
    formData.append("vehicleImage", payload.vehicleImage)
    formData.append("vehicleType", payload.vehicleType)
    formData.append("nidNumber", payload.nidNumber)
    formData.append("phoneNumber", payload.phoneNumber)
    formData.append("bloodType", payload.bloodType)
    formData.append("address", payload.address)
    formData.append("gender", payload.gender)
    formData.append("vehicleOwnership", payload.vehicleOwnership)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/driver/apply`, {
        method: 'POST',
        body: formData,
        credentials: "include"
    })


    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to submit application"
        )
    }

    return data
}

export const DriverService = {
    driverApplication
}