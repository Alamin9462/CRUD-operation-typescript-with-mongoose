import { Schema, model, Document } from "mongoose";
import { IParcel } from "../Parcel/parcel.model";

export type UserRole = "admin" | "delivery_agent" | "customer";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  address?: string;
  agentProfile?: {
    vehicleNumber?: string;
    assignedParcels?: Schema.Types.ObjectId[];
  };
  isActive: boolean;
  location?: {
    lat: number;
    lng: number;
    updatedAt: Date;
  };
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "delivery_agent", "customer"],
      required: true,
      default: "customer",
    },
    phone: { type: String },
    address: { type: String },
    agentProfile: {
      vehicleNumber: { type: String },
      assignedParcels: [{ type: Schema.Types.ObjectId, ref: "Parcel" }],
    },
    isActive: { type: Boolean, default: true },
    location: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
      updatedAt: { type: Date, default: Date.now },
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>("User", userSchema);
