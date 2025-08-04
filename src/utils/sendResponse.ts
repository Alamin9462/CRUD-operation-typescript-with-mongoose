import { Response } from "express";
interface ISendResponse<T = any> {
  statusCode: number;
  success: boolean;
  message?: string;
  token?: string;
  data?: T;
}

const sendResponse = <T>(res: Response, options: ISendResponse<T>) => {
  res.status(options.statusCode).json({
    success: options.success,
    message: options.message,
    token: options.token,
    data: options.data ?? null,
  });
};

export default sendResponse;