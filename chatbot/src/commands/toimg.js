const { MessageMedia } = require('whatsapp-web.js');
const { stickerToImage } = require('../utils/media');

async function toimgCommand(msg) {
  if (!msg.hasMedia) {
    return msg.reply('Reply ke sticker dengan .toimg untuk convert ke gambar.');
  }

  const media = await msg.downloadMedia();
  if (!media) {
    return msg.reply('Gagal mendownload media.');
  }

  try {
    const buffer = await stickerToImage(Buffer.from(media.data, 'base64'));
    const imgMedia = new MessageMedia('image/png', buffer.toString('base64'));
    await msg.reply(imgMedia);
  } catch (err) {
    await msg.reply('Gagal convert sticker ke gambar.');
  }
}

module.exports = toimgCommand;
