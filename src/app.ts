import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./Modules/User/user.route";
import { parcleRouter } from "./Modules/Parcel/parcel.route";
import { authRouter } from "./Modules/Auth/auth.router";

const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(cors({ origin: "https://courier-parcel-client.vercel.app", credentials: true }));

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
