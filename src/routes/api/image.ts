import express from "express";
import { promises as fs } from "fs";
import path from "path";
import imgProccesser from "../../services/imgProccesser";
import cache from "node-cache";

export const imgCache = new cache();

export const imageRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/ban-types
const check = (req: express.Request, res: express.Response, next: Function) => {
  if (
    typeof req.query.filename === "undefined" &&
    typeof req.query.width === "undefined" &&
    typeof req.query.height === "undefined"
  ) {
    res.send("missing inputs");
  } else {
    if (!((req.query.filename as string).split(".").length > 1)) {
      res.send("please provide file format in filename");
    } else if (
      !((req.query.width as unknown as number) > 0) ||
      !((req.query.height as unknown as number) > 0)
    ) {
      res.send("height nad width must be numbers and over 0");
    } else {
      next();
    }
  }
};

imageRouter
  .route("/")
  .get(check, async (req: express.Request, res: express.Response) => {
    if (imgCache.getStats()["keys"] > 0) {
      if (
        imgCache.get("name") === req.query.filename &&
        imgCache.get("width") === req.query.width &&
        imgCache.get("height") === req.query.height
      ) {
        return res.sendFile(imgCache.get("imgPath") as string);
      } else {
        imgCache.flushAll();
      }
    }
    try {
      const name = req.query.filename as string;
      const height = parseInt(req.query.height as string);
      const width = parseInt(req.query.width as string);
      await fs.stat(path.join(__dirname, `../../../assets/images/${name}`));
      const imgPath = await imgProccesser(name, height, width);
      res.sendFile(imgPath);
    } catch (err) {
      res.send(err);
    }
  });
