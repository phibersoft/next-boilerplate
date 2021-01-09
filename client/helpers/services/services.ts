import axios from "axios";
const mime = require("mime");
import { Multer } from "multer";
import { MulterFile } from "../../interfaces";
const uniqid = require("uniqid");
export const prepareImageName = (file: MulterFile) => {
  const extension = mime.getExtension(file.mimetype);

    return `${uniqid()}-${uniqid()}-${uniqid()}.${extension}`;

};
export const imageToBuffer = async (link: string): Promise<Buffer> => {
  const results = await axios.get(link, {
    responseType: "arraybuffer",
  });
  return Buffer.from(results.data);
};

export const objectToQuery = (obj: object):string => {
  const keys = Object.keys(obj);
  var str = [];
  keys.forEach(k => {
    str.push(`${k}=${obj[k]}`);
  })
  return str.join("&");
}