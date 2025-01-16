import express, { Application, Request, Response } from "express";
import cors from "cors";
import productRouter from "./Modules/Products/product.router";
import orderRouter from "./Modules/Order/order.router";

const app: Application = express();
const port = 3000;

// parser
app.use(express.json());
app.use(cors());

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "Server live Right Now",
    Credential: true,
  });
});

export default app;
