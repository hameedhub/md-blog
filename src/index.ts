import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from 'yamljs';
import awsServerlessExpress from 'aws-serverless-express';
import router from "./routes";
import ResponseUtil from "./utils/response.util";

const { badRequest } = ResponseUtil


const swaggerDocument = YAML.load(`${process.cwd()}/public/swagger.yaml`);
const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) =>
  res.status(200).json("Welcome to MD blog")
);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error("Not Found") as any;
  err.status = 404;
  next(err);
});

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  badRequest(res, err.message, err.status)
  next();
});

const server = awsServerlessExpress.createServer(app);

// Lambda handler function
export const handler = (event: any, context: any) => {
  awsServerlessExpress.proxy(server, event, context);
};