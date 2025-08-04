import { IUser, User } from '../User/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Config_File from '../../Config_File';


export const register = async (userData: Partial<IUser>) => {
  const hashedPassword = await bcrypt.hash(userData.password!, 10);
  const user = new User({ ...userData, password: hashedPassword });
  return user.save();
};


export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  if (!Config_File.jwtSecret) {
    throw new Error('JWT secret is not defined');
  }
  const token = jwt.sign({ id: user._id, role: user.role }, Config_File.jwtSecret as string, { expiresIn: '7d' });
  return { user, token };
};


export const logout = async () => {
  return { message: 'Logout successful' };
};
