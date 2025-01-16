import { IProduct } from "./product.interface";
import Product from "./product.model";

const createBook = async (payload: IProduct): Promise<IProduct> => {
  const result = await Product.create(payload);
  return result;
};

const getBookProduct = async () => {
  const result = await Product.find();
  return result;
};

const singleBookProduct = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};
const updateBookProduct = async (id: string, data: IProduct) => {
  const result = await Product.findByIdAndUpdate(id, data, { new: true });
  return result;
};
const deleteBookProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const userBookService = {
  createBook,
  getBookProduct,
  singleBookProduct,
  updateBookProduct,
  deleteBookProduct,
};
