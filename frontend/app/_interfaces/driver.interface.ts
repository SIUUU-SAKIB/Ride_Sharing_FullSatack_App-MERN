export enum IVehicleType {
    TWO_WHEELER = "Two Wheeler",
    THREE_WHEELER = "Three Wheeler",
    FOUR_WHEELER = "Four Wheeler"
}
export enum IGender {
    MALE = "Male",
    FEMALE = "Female",
    TRANSGENDER = "Transgender"
}
export enum IVehicleOwnsership {
    OWNED = "Owned",
    RENT = "Rent"
}
export enum IDriverStatus {
    PENDING = "Pending",
    APPROVED = "Approved",
    REJECTED = "Rejected"
}

export interface DriverApplicationPayload {
  licenseNumber: string
  vehicleNumber: string
  vehicleType: string
  vehicleName:string
  nidNumber: string
  phoneNumber: string
  bloodType: string
  address: string
  gender: string
  vehicleOwnership: string
  licenseImage: File
  vehicleImage: File
}