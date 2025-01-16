import mongoose, { Schema } from "mongoose";
import { Iorder } from "./order.interface";

const orderSchema = new Schema<Iorder>({
  email: { type: String, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
  totalPrice: { type: Number, required: true, min: 0 },
});

const Order = mongoose.model<Iorder>("Order", orderSchema);
export default Order;
