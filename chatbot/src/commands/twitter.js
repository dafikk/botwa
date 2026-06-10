const { MessageMedia } = require('whatsapp-web.js');
const { downloadMedia, cleanup } = require('../utils/downloader');

async function twitterCommand(msg, url) {
  if (!url) {
    return msg.reply('Gunakan: .x <url>\nContoh: .x https://x.com/username/status/xxxxx');
  }

  await msg.reply('⏬ Mendownload media Twitter/X...');

  try {
    const filePath = await downloadMedia(url, 'twitter');
    const media = MessageMedia.fromFilePath(filePath);

    try {
      await msg.reply(media);
    } catch {
      await msg.reply(media, null, { sendMediaAsDocument: true });
    }

    cleanup(filePath);
  } catch (err) {
    console.error('Twitter error:', err);
    await msg.reply('Gagal mendownload Twitter/X. Pastikan url benar.');
  }
}

module.exports = twitterCommand;
