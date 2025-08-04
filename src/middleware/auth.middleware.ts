import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../Modules/User/user.model';
import Config_File from '../Config_File';

// Auth middleware: verifies JWT and attaches user to req
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, Config_File.jwtSecret as string) as Partial<IUser> & { id: string };
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// RBAC middleware: restricts access by role(s)
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as Partial<IUser>;
    if (!user || !roles.includes(user.role!)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    next();
  };
};
