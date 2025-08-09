// models/Parcel.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IParcel extends Document {
  customer: mongoose.Types.ObjectId;
  agent?: mongoose.Types.ObjectId;
  pickupAddress: string;
  deliveryAddress: string;
  status: 'Pending' | 'Picked Up' | 'In Transit' | 'Delivered' | 'Failed';
  type: 'small' | 'medium' | 'large';
  isCOD: boolean;
  amount?: number;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  trackingCode: string;
}

const parcelSchema = new Schema<IParcel>(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    agent: { type: Schema.Types.ObjectId, ref: 'User' },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Picked Up', 'In Transit', 'Delivered', 'Failed'],
      default: 'Pending',
    },
    type: {
      type: String,
      enum: ['small', 'medium', 'large'],
      default: 'small',
    },
    isCOD: { type: Boolean, default: true },
    amount: { type: Number, default: 0 },
    currentLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
    trackingCode: { type: String, unique: true },
  },
  { timestamps: true }
);

const Parcel = mongoose.model<IParcel>('Parcel', parcelSchema);
export default Parcel;
