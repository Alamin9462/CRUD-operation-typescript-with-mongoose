import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./Modules/User/user.route";
import { parcleRouter } from "./Modules/Parcel/parcel.route";
import { authRouter } from "./Modules/Auth/auth.router";


const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

 app.use("/api/auth", authRouter);
app.use("/api/parcel", parcleRouter);
app.use("/api/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "Server live Right Now",
    Credential: true,
  });
});

export default app;
