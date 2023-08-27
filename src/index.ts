import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import router from "./routes";

const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) =>
  res.status(200).json("Welcome to MD blog")
);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error("Not Found") as any;
  err.status = 404;
  next(err);
});

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).json(err.message);
  next();
});

export default app;
