const Jimp = require("jimp");

const processImage = async (buffer) => {
  const maxWidth = 320;
  const maxHeight = 240;

  const image = await Jimp.read(buffer);
  image.cover(maxWidth, maxHeight).quality(80);

  return image.getBufferAsync(Jimp.AUTO);
};

module.exports = processImage;
