const { MessageMedia } = require('whatsapp-web.js');
const { downloadMedia, cleanup } = require('../utils/downloader');

async function tiktokCommand(msg, url) {
  if (!url) {
    return msg.reply('Gunakan: .tiktok <url>\nContoh: .tiktok https://vm.tiktok.com/xxxxx');
  }

  await msg.reply('⏬ Mendownload video TikTok...');

  try {
    const filePath = await downloadMedia(url, 'tiktok');
    const media = MessageMedia.fromFilePath(filePath);

    try {
      await msg.reply(media);
    } catch {
      await msg.reply(media, null, { sendMediaAsDocument: true });
    }

    cleanup(filePath);
  } catch (err) {
    console.error('TikTok error:', err);
    await msg.reply('Gagal mendownload TikTok. Pastikan url benar.');
  }
}

module.exports = tiktokCommand;
