import { Types } from "mongoose";
import { DriverApplicationDB } from "../app/modules/DRIVER/driver.model";
import { UserDB } from "../app/modules/USER/user.model";
import {
  IDriverStatus,
  IVehicleOwnsership,
  IVehicleType,
  IGender,
} from "../app/modules/DRIVER/driver.interface";


export const riderSeed = Array.from({ length: 50 }, (_, i) => ({
  _id: new Types.ObjectId(),
  name: `Rider ${i + 1}`,
  email: `rider${i + 1}@gmail.com`,
  phoneNumber: `017${String(10000000 + i).slice(0, 8)}`,
  address: [
    "Mirpur, Dhaka",
    "Dhanmondi, Dhaka",
    "Uttara, Dhaka",
    "Agrabad, Chattogram",
    "Khulna Sadar",
    "Rajshahi",
    "Sylhet",
    "Barishal",
    "Cumilla",
    "Rangpur",
  ][i % 10],
  role: "RIDER",
  profilePhoto: "",
  isVerified: true,
  isBlocked: i % 11 === 0,
  createdAt: new Date(
    2026,
    Math.floor(Math.random() * 7),
    Math.floor(Math.random() * 28 + 1)
  ),
}));



export const seedDriverApplications = async () => {
  // Remove previous applications
  await DriverApplicationDB.deleteMany({});

  // Get existing riders/users
  const users = await UserDB.find({ role: "RIDER" }).limit(10);

  if (users.length === 0) {
    console.log("No riders found. Seed riders first.");
    return;
  }

  const applications = users.map((user, index) => ({
    userId: user._id,

    licenseNumber: `DHK-${1000 + index}-${500000 + index}`,

    licenseImage: [
      {
        url: "https://placehold.co/600x400",
        public_id: `license_${index}`,
      },
    ],

    vehicleImage: [
      {
        url: "https://placehold.co/600x400",
        public_id: `vehicle_${index}`,
      },
    ],

    vehicleNumber: `DHAKA-GA-${10 + index}-${1000 + index}`,

    vehicleName: [
      "Toyota Axio",
      "Toyota Premio",
      "Honda Civic",
      "Suzuki WagonR",
      "Honda Vezel",
      "TVS Metro",
      "Hero Splendor",
      "Yamaha FZS",
      "Nissan Sunny",
      "Hyundai Tucson",
    ][index],

    vehicleType: [
      IVehicleType.FOUR_WHEELER,
      IVehicleType.FOUR_WHEELER,
      IVehicleType.FOUR_WHEELER,
      IVehicleType.FOUR_WHEELER,
      IVehicleType.FOUR_WHEELER,
      IVehicleType.TWO_WHEELER,
      IVehicleType.TWO_WHEELER,
      IVehicleType.TWO_WHEELER,
      IVehicleType.FOUR_WHEELER,
      IVehicleType.FOUR_WHEELER,
    ][index],

    nidNumber: `199${index}1234567890123`,

    phoneNumber: user.phone,

    bloodType: [
      "A+",
      "A-",
      "B+",
      "B-",
      "AB+",
      "AB-",
      "O+",
      "O-",
      "A+",
      "B+",
    ][index],

    address: user.baseLocation,

    gender: index % 2 === 0 ? IGender.MALE : IGender.FEMALE,

    vehicleOwnership:
      index % 2 === 0
        ? IVehicleOwnsership.OWNED
        : IVehicleOwnsership.RENT,

    status: [
      IDriverStatus.PENDING,
      IDriverStatus.APPROVED,
      IDriverStatus.REJECTED,
      IDriverStatus.PENDING,
      IDriverStatus.APPROVED,
      IDriverStatus.PENDING,
      IDriverStatus.REJECTED,
      IDriverStatus.APPROVED,
      IDriverStatus.PENDING,
      IDriverStatus.APPROVED,
    ][index],

    rejectionReason:
      index % 3 === 2 ? "Incomplete vehicle documents" : undefined,

    reviewdAt:
      index % 3 === 0 ? undefined : new Date(),

    reviewdBy: undefined,

    reviewerName:
      index % 3 === 0 ? undefined : "RideX Admin",

    reviewerEmail:
      index % 3 === 0
        ? undefined
        : "admin@ridex.com",

    isBlocked: index === 8,
  }));

  await DriverApplicationDB.insertMany(applications);

  console.log(
    `${applications.length} driver applications inserted successfully 🚀`
  );
};