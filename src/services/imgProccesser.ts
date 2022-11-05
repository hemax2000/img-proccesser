import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import { imgCache } from "../routes/api/image";

const imgProccesser = async (
  name: string,
  width: number,
  height: number
): Promise<string> => {
  const originalPath = path.join(__dirname, `../../assets/images/${name}`);

  const resizedImg = sharp(originalPath).resize(width, height);
  const tmpName = name.split(".");
  const newName = tmpName[0] + "_thumb." + tmpName[1];
  const newPath = path.join(__dirname, `../../assets/thumb/${newName}`);
  const pic = await fs.open(newPath, "a+");

  await pic.write(newPath);
  pic.close();

  await resizedImg.toFile(newPath);

  imgCache.mset([
    { key: "imgPath", val: newPath, ttl: 20 },
    { key: "name", val: name, ttl: 20 },
    { key: "width", val: width as unknown as string, ttl: 20 },
    { key: "height", val: height as unknown as string, ttl: 20 },
  ]);
  return newPath;
};

export default imgProccesser;
