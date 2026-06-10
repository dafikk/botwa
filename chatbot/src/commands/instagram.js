const { MessageMedia } = require('whatsapp-web.js');
const { downloadMedia, cleanup } = require('../utils/downloader');

async function instagramCommand(msg, url) {
  if (!url) {
    return msg.reply('Gunakan: .ig <url>\nContoh: .ig https://instagram.com/p/xxxxx');
  }

  await msg.reply('⏬ Mendownload media Instagram...');

  try {
    const filePath = await downloadMedia(url, 'instagram');
    const media = MessageMedia.fromFilePath(filePath);

    try {
      await msg.reply(media);
    } catch {
      await msg.reply(media, null, { sendMediaAsDocument: true });
    }

    cleanup(filePath);
  } catch (err) {
    console.error('Instagram error:', err);
    await msg.reply('Gagal mendownload Instagram. Pastikan url benar.');
  }
}

module.exports = instagramCommand;
