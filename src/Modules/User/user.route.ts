
import { Router } from 'express';
import * as userController from './user.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';

const router = Router();

// Create user (open for admin registration)
router.post('/create-user', userController.createUser);
router.get('/', authenticate, authorize('admin'), userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', authenticate, authorize('admin'), userController.updateUser);
router.delete('/:id', authenticate, authorize('admin'), userController.deactivateUser);
router.post('/assign-parcels', authenticate, authorize('admin'), userController.assignParcelsToAgent);

export const userRouter = router;
