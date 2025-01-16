import { Router } from "express";
import { productController } from "./product.controller";

const productRouter = Router();
productRouter.post("/create-product", productController.createBookProduct);
productRouter.get("/", productController.getBookProduct);
productRouter.get("/:productId", productController.FindSingleBookProduct);
productRouter.put("/:productId", productController.updataBook);
productRouter.delete( "/:productId", productController.deleteBookOfSingleProduct,
);

export default productRouter;
