import mongoose from "mongoose";

export interface Iorder {
  email: string;
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
}
