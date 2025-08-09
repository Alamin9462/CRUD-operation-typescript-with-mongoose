

import Parcel, { IParcel } from "./parcel.model";

// Helper to generate a unique tracking code
const generateTrackingCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'TRK';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Create a new parcel with auto-generated tracking code
const createParcel = async (payload: Partial<IParcel>): Promise<IParcel> => {
  const trackingCode = generateTrackingCode();
  const result = await Parcel.create({ ...payload, trackingCode });
  return result;
};

// Get all parcels, optionally filtered
const getParcels = async (filter: any = {}) => {
  return await Parcel.find(filter).populate("customer agent");
};

// Get a single parcel by ID
const getParcelById = async (id: string) => {
  return await Parcel.findById(id);
};

// Update a parcel by ID
const updateParcel = async (id: string, data: Partial<IParcel>) => {
  return await Parcel.findByIdAndUpdate(id, data, { new: true });
};

// Delete a parcel by ID
const deleteParcel = async (id: string) => {
  return await Parcel.findByIdAndDelete(id);
};

export const parcelService = {
  createParcel,
  getParcels,
  getParcelById,
  updateParcel,
  deleteParcel,
};
