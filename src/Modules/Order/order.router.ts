import { Router } from "express";
import { orderController } from "./order.controller";

const orderRouter = Router();
orderRouter.get("/revenue", orderController.getTotalRevenue);
orderRouter.post("/", orderController.createOrder)
export default orderRouter;
