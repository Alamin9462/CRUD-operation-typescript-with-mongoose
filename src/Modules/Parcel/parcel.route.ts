import { Router } from 'express';
import * as parcelController from './parcel.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';

const router = Router();

/* ================= CUSTOMER ROUTES ================= */
// Create parcel (customer only)
router.post('/', authenticate, authorize('customer'), parcelController.createParcel); 

// Get all parcels for the logged-in customer
router.get('/my-parcels', authenticate, authorize('customer'), parcelController.getMyParcels);

// Get parcel location (customer only)
router.get('/:id/location', authenticate, authorize('customer'), parcelController.getParcelLocation);


/* ================= ADMIN ROUTES ================= */
// Get all parcels (admin only)
router.get('/', authenticate, authorize('admin'), parcelController.getParcels);

// Update parcel by id (admin only)
router.put('/:id', authenticate, authorize('admin'), parcelController.updateParcel);

// Delete parcel by id (admin only)
router.delete('/:id', authenticate, authorize('admin'), parcelController.deleteParcel);

// Admin dashboard metrics (admin only)
router.get('/metrics/dashboard', authenticate, authorize('admin'), parcelController.getParcelMetrics);

// Export parcels as CSV (admin only)
router.get('/export/csv', authenticate, authorize('admin'), parcelController.exportParcelsCSV);


/* ================= DELIVERY AGENT ROUTES ================= */
// Get pickup location for agent
router.get('/:agentId/pickups', authenticate, authorize('delivery_agent'), parcelController.getPickupLocationsByAgent);

// Update parcel status (delivery agent only)
router.put('/:id/status', authenticate, authorize('delivery_agent'), parcelController.updateParcelStatus);

// Update parcel location (delivery agent only)
router.put('/:id/location', authenticate, authorize('delivery_agent'), parcelController.updateParcelLocation);


/* ================= COMMENTED / UNUSED ROUTES ================= */
// Get assigned parcels for delivery agent (commented out)
// router.get('/assigned', authenticate, authorize('delivery_agent'), parcelController.getAssignedParcels);

// Get parcel by id (any authenticated user) (commented out)
// router.get('/:id', authenticate, parcelController.getParcelById);

export const parcleRouter = router;
