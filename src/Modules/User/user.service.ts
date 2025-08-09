

import { User, IUser } from './user.model';
import { FilterQuery, UpdateQuery } from 'mongoose';
import bcrypt from 'bcryptjs';

// Create a new user for Only Admin
export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  let password = userData.password;
  if (password) {
    password = await bcrypt.hash(password, 10);
  }
  const user = new User({ ...userData, password });
  return await user.save();
};

// Find a user by filter (e.g., email, id)
export const findUser = async (filter: FilterQuery<IUser>): Promise<IUser | null> => {
  return await User.findOne(filter);
};

// Get all users (optionally filter by role)
export const getUsers = async (filter: FilterQuery<IUser> = {}): Promise<IUser[]> => {
  return await User.find(filter);
};

// Update a user by id
export const updateUser = async (
  userId: string,
  update: UpdateQuery<IUser>
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(userId, update, { new: true });
};

// Delete (deactivate) a user by id
export const deactivateUser = async (userId: string): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
};

// Assign parcels to a delivery agent
export const assignParcelsToAgent = async (
  agentId: string,
  parcelIds: string[]
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    agentId,
    { $addToSet: { 'agentProfile.assignedParcels': { $each: parcelIds } } },
    { new: true }
  );
};


export const getAssignedParcelsByAgent = async (agentId: string) => {
  const agent = await User.findById(agentId)
    .populate({
      path: "agentProfile.assignedParcels",
      populate: {
        path: "customer", 
        model: "User", 
        select: "name phone email", 
      },
    });

  if (!agent) {
    return null;
  }

  return agent.agentProfile?.assignedParcels ?? null;
};



