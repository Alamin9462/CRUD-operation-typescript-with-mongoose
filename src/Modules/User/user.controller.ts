

import { Request, Response } from 'express';
import * as userService from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { User } from './user.model';
import Parcel from '../Parcel/parcel.model';

// Create a new user
export const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: user,
  });
});

// Get all users (optionally filter by role)
export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const filter: any = {};
  if (req.query.role) filter.role = req.query.role;
  const users = await userService.getUsers(filter);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  });
});

// Get a single user by id
export const getUserById = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.findUser({ _id: req.params.id });
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'User not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: user,
  });
});

// Update a user by id
export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'User not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: user,
  });
});

// Deactivate (soft delete) a user by id
export const deactivateUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.deactivateUser(req.params.id);
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'User not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deactivated',
    data: user,
  });
});

// Assign parcels to a delivery agent


export const assignParcelsToAgent = async (req: Request, res: Response) => {
  try {
    const { agentId, parcelIds } = req.body;

    if (!agentId || !parcelIds || !parcelIds.length) {
      return res.status(400).json({ success: false, message: "Agent ID and parcel IDs are required" });
    }
 
    const agent = await User.findByIdAndUpdate(
      agentId,
      { $addToSet: { 'agentProfile.assignedParcels': { $each: parcelIds } } },
      { new: true }
    );

    if (!agent) {
      return res.status(404).json({ success: false, message: "Agent not found" });
    }

    await Parcel.updateMany(
      { _id: { $in: parcelIds } },
      { $set: { agent: agentId } }
    );

    return res.status(200).json({
      success: true,
      message: "Parcels assigned to agent successfully",
      data: agent,
    });
  } catch (error) {
    console.error("Error assigning parcels:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



// Get assigned parcels of a specific agent
export const getAssignedParcelsByAgent = catchAsync(async (req: Request, res: Response) => {
  const { agentId } = req.params;

  const parcels = await userService.getAssignedParcelsByAgent(agentId);

  if (!parcels || parcels.length === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'No parcels found for this agent',
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parcels retrieved successfully',
    data: parcels,
  });
});


// In user.controller.ts
export const updateAgentLocation = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user || user.role !== 'delivery_agent') {
    return sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: false,
      message: 'Only delivery agents can update their location',
    });
  }
  const { lat, lng } = req.body;
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'lat and lng must be numbers',
    });
  }
  const updatedUser = await userService.updateUser(user._id, {
    location: { lat, lng, updatedAt: new Date() }
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Agent location updated successfully',
    data: updatedUser,
  });
});
