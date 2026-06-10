const { MessageMedia } = require('whatsapp-web.js');
const { imageToSticker, videoToSticker } = require('../utils/media');
const path = require('path');
const fs = require('fs');

async function stickerCommand(msg) {
  if (!msg.hasMedia) {
    return msg.reply('Reply ke gambar/video dengan .sticker untuk convert ke sticker.');
  }

  const media = await msg.downloadMedia();
  if (!media) {
    return msg.reply('Gagal mendownload media.');
  }

  try {
    let buffer;
    if (media.mimetype.startsWith('video/')) {
      const tempPath = path.join(__dirname, '../../media', `vid_${Date.now()}.tmp`);
      fs.writeFileSync(tempPath, Buffer.from(media.data, 'base64'));
      buffer = await videoToSticker(tempPath);
      fs.unlinkSync(tempPath);
    } else {
      buffer = await imageToSticker(Buffer.from(media.data, 'base64'));
    }

    const stickerMedia = new MessageMedia('image/webp', buffer.toString('base64'));
    await msg.reply(stickerMedia, null, { sendMediaAsSticker: true });
  } catch (err) {
    await msg.reply('Gagal convert ke sticker.');
  }
}

module.exports = stickerCommand;
