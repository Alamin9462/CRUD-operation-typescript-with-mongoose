
import { Router } from 'express';
import * as userController from './user.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';

const router = Router();

// Create user (open for admin registration)
router.post('/create-user' ,userController.createUser);
router.get('/', authenticate, authorize('admin'), userController.getUsers);
router.get('/:id', authenticate, userController.getUserById);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, userController.deactivateUser);
router.post('/assign-parcels', authenticate, authorize('admin'), userController.assignParcelsToAgent);
router.get('/assigned-parcels/:agentId', authenticate, authorize('delivery_agent'), userController.getAssignedParcelsByAgent);
router.post('/update-location', authenticate, authorize('delivery_agent'),userController.updateAgentLocation);
export const userRouter = router;
