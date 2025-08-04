import { NextFunction, Request, RequestHandler, Response } from 'express';

// Higher order function to handle async errors
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(err => next(err));
  };
};

export default catchAsync;
