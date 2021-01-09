import * as Jimp from "jimp";

export const avatarOptimizer = async (image) => {
  var img = await Jimp.read(image);
  await img.resize(500, Jimp.AUTO);
  await img.quality(100);
  await img.writeAsync(image);
};

export default async (images, width, height = Jimp.AUTO, quality = 100) => {
  await Promise.all(
    images.map(async (imgPath) => {
      const image = await Jimp.read(imgPath);
      await image.resize(width, height);
      await image.quality(quality);
      await image.writeAsync(imgPath);
    })
  );
};
