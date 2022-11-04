import express from "express";
import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import cache from "node-cache";

const imgCache = new cache();

const imageRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/ban-types
const check = (req: express.Request, res: express.Response, next: Function) => {
  if (
    typeof req.query.image === "undefined" &&
    typeof req.query.image === "undefined" &&
    typeof req.query.image === "undefined"
  ) {
    res.send("missing inputs");
  } else {
    next();
  }
};
imageRouter.route("/").get(check, async (req, res) => {
  if (imgCache.getStats()["keys"] > 0) {
    if (
      imgCache.get("name") === req.query.image &&
      imgCache.get("width") === req.query.width &&
      imgCache.get("height") === req.query.height
    ) {
      return res.sendFile(imgCache.get("imgPath") as string);
    } else {
      imgCache.flushAll();
    }
  }

  const name = req.query.image as string;
  const height = parseInt(req.query.height as string);
  const width = parseInt(req.query.width as string);

  const originalPath = path.join(__dirname, `../../../assets/images/${name}`);
  try {
    const resizedImg = sharp(originalPath).resize(width, height);

    await fs.stat(originalPath);

    const tmpName = name.split(".");
    const newName = tmpName[0] + "_thumb." + tmpName[1];
    const newPath = path.join(__dirname, `../../../assets/thumb/${newName}`);

    const pic = await fs.open(newPath, "a+");
    await pic.write(newPath);
    pic.close();

    await resizedImg.toFile(newPath);

    imgCache.mset([
      { key: "imgPath", val: newPath, ttl: 20 },
      { key: "name", val: req.query.image, ttl: 20 },
      { key: "width", val: req.query.width, ttl: 20 },
      { key: "height", val: req.query.height, ttl: 20 },
    ]);
    res.sendFile(newPath);
  } catch {
    res.send("file does not exist");
  }
});

export default imageRouter;
