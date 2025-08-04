

import { Request, Response } from 'express';
import * as userService from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

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

export const assignParcelsToAgent = catchAsync(async (req: Request, res: Response) => {
  const { agentId, parcelIds } = req.body;
  if (!agentId || !parcelIds) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'agentId and parcelIds are required',
    });
  }
  // Call the service to assign parcels to the agent
  const user = await userService.assignParcelsToAgent(agentId, parcelIds);
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Agent not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parcels assigned to agent successfully',
    data: user,
  });
});