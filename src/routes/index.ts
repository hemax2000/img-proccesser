import express from "express";
import { imageRouter } from "./api/image";
const routes = express.Router();

routes.get("/", (req: express.Request, res: express.Response): void => {
  res.send("hello world");
});

routes.use("/image?", imageRouter);

export default routes;
