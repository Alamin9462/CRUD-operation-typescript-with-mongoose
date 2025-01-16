import { Request, Response } from "express";
import Product from "./product.model";
import { userBookService } from "./product.service";

const createBookProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await userBookService.createBook(payload);

    res.json({
      status: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Something went wrong",
      error,
    });
  }
};

const getBookProduct = async (req: Request, res: Response) => {
  try {
    const result = await userBookService.getBookProduct();
    res.send({
      status: true,
      message: "Books recived successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Something went wrong",
      error,
    });
  }
};
const FindSingleBookProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await userBookService.singleBookProduct(productId);
    res.send({
      status: true,
      message: "Books getting successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Something went wrong",
      error,
    });
  }
};
const updataBook = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const body = req.body;
    const result = await userBookService.updateBookProduct(productId, body);
    res.send({
      status: true,
      message: "Books updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Something went wrong",
      error,
    });
  }
};
const deleteBookOfSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    await userBookService.deleteBookProduct(productId);
    res.send({
      status: true,
      message: "Books deleted successfully",
      data: {},
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const productController = {
  createBookProduct,
  getBookProduct,
  FindSingleBookProduct,
  updataBook,
  deleteBookOfSingleProduct,
};
