import { Schema, model, Document } from 'mongoose';

export type UserRole = 'admin' | 'delivery_agent' | 'customer';

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
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'delivery_agent', 'customer'],
      required: true,
      default: 'customer',
    },
    phone: { type: String },
    address: { type: String },
    agentProfile: {
      vehicleNumber: { type: String },
      assignedParcels: [{ type: Schema.Types.ObjectId, ref: 'Parcel' }],
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>('User', userSchema);