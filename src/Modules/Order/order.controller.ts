import Product from "../Products/product.model";
import { Request, Response } from "express";
import Order from "./order.model";
import express from 'express';

const createOrder = async (req: express.Request, res: express.Response)  => {
  try {
    const { product, quantity } = req.body;
    const book = await Product.findById(product);

    if (!book || !book.inStock || (book.quantity ?? 0)  < quantity) {
      return res.json({
        status: false,
        message: "Insufficient stock",
      });
    }

    // calculated the total price for order

    const totalPrice = book.price * quantity;
    const orders = await Order.create({ ...req.body, totalPrice });
    const updatedQuantity = (book.quantity ?? 0) - quantity;
    book.inStock = updatedQuantity > 0;
    await book.save();
    res.send({
      message: "Order created successfully ",
      success: true,
      data: orders,
    });
  } catch (error) {
    res.json({
      message: "Error creating order",
      success: false,
      error,
    });
  }
};

const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const revenueData = await Order.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "data",
        },
      },
    ]);

    // I don't understand for the aggregate and but i can try this one

    res.status(200).json({
      message: "Revenue calculated successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to calculate revenue",
      status: false,
      error,
    });
  }
};

export const orderController = {
  createOrder,
  getTotalRevenue,
};
