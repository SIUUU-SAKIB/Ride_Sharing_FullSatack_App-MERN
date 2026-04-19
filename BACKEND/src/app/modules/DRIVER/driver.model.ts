import { model, Schema, Types } from "mongoose";
import { IDriverApplication, IDriverProfile, IDriverStatus, IGender, IVehicleOwnsership, IVehicleType } from "./driver.interface";

const DriverApplicationSchema = new Schema<IDriverApplication>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  licenseNumber: {
    type: String,
    required: true
  },
  licenseImage: [
    {
      url: String,
      public_id: String,
    }
  ],
  nidImage: [
    {
      url: String,
      public_id: String,
    }
  ],
  vehicleImage: [
    {
      url: String,
      public_id: String,
    }
  ],
  vehicleNumber: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    enum: Object.values(IVehicleType),
    required: true
  },
  nidNumber: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  bloodType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    enum: Object.values(IGender),
    required: true,
  }, vehicleOwnership: {
    type: String,
    enum: Object.values(IVehicleOwnsership),
    required: true,
  },
  rejectionReason: {
    type: String
  },
  reviewdAt: {
    type: Date
  },
  reviewdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin"
  }, reviewerName: {
    type: String
  },
   reviewerEmail: {
    type: String 
  },
  status: {
    type: String,
    enum: Object.values(IDriverStatus),
    default: IDriverStatus.PENDING,
  }
},
  {
    timestamps: true,
    versionKey: false
  })


const DriverProfileSchema = new Schema<IDriverProfile>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    driverId: {
      type: String,
      required: true,
      trim: true
    },
    licenseNumber: {
      type: String,
      required: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
    },

    vehicleType: {
      type: String,
      enum: Object.values(IVehicleType),
      required: true,
    },

    bloodType: {
      type: String,
    },

    address: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: false
    }

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const DriverProfileDB = model<IDriverProfile>(
  "DriverProfile",
  DriverProfileSchema
);
export const DriverApplicationDB = model<IDriverApplication>(
  "DriverApplication", DriverApplicationSchema
)