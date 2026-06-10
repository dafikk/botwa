const { MessageMedia } = require('whatsapp-web.js');
const { downloadMedia, cleanup } = require('../utils/downloader');

async function facebookCommand(msg, url) {
  if (!url) {
    return msg.reply('Gunakan: .fb <url>\nContoh: .fb https://facebook.com/xxxxx/videos/xxxxx');
  }

  await msg.reply('⏬ Waitt...');

  try {
    const filePath = await downloadMedia(url, 'facebook');
    const media = MessageMedia.fromFilePath(filePath);

    try {
      await msg.reply(media);
    } catch {
      await msg.reply(media, null, { sendMediaAsDocument: true });
    }

    cleanup(filePath);
  } catch (err) {
    console.error('Facebook error:', err);
    await msg.reply('Gagal mendownload Facebook. Pastikan url benar.');
  }
}

module.exports = facebookCommand;
