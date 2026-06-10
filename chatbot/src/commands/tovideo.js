const { MessageMedia } = require('whatsapp-web.js');
const { stickerToVideo } = require('../utils/media');
const path = require('path');
const fs = require('fs');

async function tovideoCommand(msg) {
  if (!msg.hasMedia) {
    return msg.reply('Reply ke sticker animasi dengan .tovideo untuk convert ke video.');
  }

  const media = await msg.downloadMedia();
  if (!media) {
    return msg.reply('Gagal mendownload media.');
  }

  try {
    const tempPath = path.join(__dirname, '../../media', `sticker_${Date.now()}.webp`);
    fs.writeFileSync(tempPath, Buffer.from(media.data, 'base64'));
    const buffer = await stickerToVideo(tempPath);
    fs.unlinkSync(tempPath);

    const videoMedia = new MessageMedia('video/mp4', buffer.toString('base64'));
    await msg.reply(videoMedia);
  } catch (err) {
    await msg.reply('Gagal convert sticker ke video.');
  }
}

module.exports = tovideoCommand;
