import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import * as authService from './auth.service';



export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: user,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: result.user,
    token: result.token,
  });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.logout();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result.message,
  });
});
