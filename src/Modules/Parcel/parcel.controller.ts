import { Parser as CsvParser } from 'json2csv';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { parcelService } from './parcel.service';
// Admin dashboard metrics
export const getParcelMetrics = catchAsync(async (req: Request, res: Response) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dailyBookings = await parcelService.getParcels({ createdAt: { $gte: today, $lt: tomorrow } });
  const failedDeliveries = await parcelService.getParcels({ status: 'Failed' });
  const codParcels = await parcelService.getParcels({ isCOD: true });
  const codAmount = codParcels.reduce((sum, p) => sum + (p.amount || 0), 0);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parcel metrics retrieved successfully',
    data: {
      dailyBookings: dailyBookings.length,
      failedDeliveries: failedDeliveries.length,
      codAmount,
    },
  });
});

// Export parcels as CSV (admin only)
export const exportParcelsCSV = catchAsync(async (req: Request, res: Response) => {
  const parcels = await parcelService.getParcels();
  const fields = ['_id', 'customer', 'agent', 'pickupAddress', 'deliveryAddress', 'status', 'type', 'isCOD', 'amount', 'trackingCode', 'createdAt', 'updatedAt'];
  const parser = new CsvParser({ fields });
  const csv = parser.parse(parcels);
  res.header('Content-Type', 'text/csv');
  res.attachment('parcels.csv');
  return res.send(csv);
});


// Update parcel location (delivery agent only)
export const updateParcelLocation = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user || user.role !== 'delivery_agent') {
    return sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: false,
      message: 'Only delivery agents can update parcel location',
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
  const parcel = await parcelService.updateParcel(req.params.id, { currentLocation: { lat, lng } });
  if (!parcel) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Parcel not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parcel location updated successfully',
    data: parcel,
  });
});

// Get parcel location (customer tracking)
export const getParcelLocation = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user || user.role !== 'customer') {
    return sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: false,
      message: 'Only customers can track parcel location',
    });
  }
  const parcel = await parcelService.getParcelById(req.params.id);
  if (!parcel) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Parcel not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parcel location retrieved successfully',
    data: parcel.currentLocation,
  });
});



// Update parcel status (delivery agent only)
export const updateParcelStatus = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user || user.role !== 'delivery_agent') {
    return sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: false,
      message: 'Only delivery agents can update parcel status',
    });
  }
  const { status } = req.body;
  const allowedStatuses = ['Picked Up', 'In Transit', 'Delivered', 'Failed'];
  if (!allowedStatuses.includes(status)) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid status',
    });
  }
  const parcel = await parcelService.updateParcel(req.params.id, { status });
  if (!parcel) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Parcel not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parcel status updated successfully',
    data: parcel,
  });
});


// Get all parcels for the logged-in customer (booking history)
export const getMyParcels = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user || user.role !== 'customer') {
    return sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: false,
      message: 'Only customers can view their booking history',
    });
  }
  const parcels = await parcelService.getParcels({ customer: user.id });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your booking history retrieved successfully',
    data: parcels,
  });
});



export const createParcel = catchAsync(async (req: Request, res: Response) => {
  const parcel = await parcelService.createParcel(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Parcel created successfully',
    data: parcel,
  });
});

export const getParcels = catchAsync(async (req: Request, res: Response) => {
  const parcels = await parcelService.getParcels();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parcels retrieved successfully',
    data: parcels,
  });
});

export const getParcelById = catchAsync(async (req: Request, res: Response) => {
  const parcel = await parcelService.getParcelById(req.params.id);
  if (!parcel) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Parcel not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parcel retrieved successfully',
    data: parcel,
  });
});

export const updateParcel = catchAsync(async (req: Request, res: Response) => {
  const parcel = await parcelService.updateParcel(req.params.id, req.body);
  if (!parcel) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Parcel not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parcel updated successfully',
    data: parcel,
  });
});

export const deleteParcel = catchAsync(async (req: Request, res: Response) => {
  const parcel = await parcelService.deleteParcel(req.params.id);
  if (!parcel) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Parcel not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parcel deleted successfully',
    data: parcel,
  });
});
