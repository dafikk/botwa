const { generateBratImage } = require('../utils/media');
const { MessageMedia } = require('whatsapp-web.js');

async function bratCommand(msg, args) {
  const text = args || 'brat';
  try {
    const buffer = await generateBratImage(text);
    const base64 = buffer.toString('base64');
    const media = new MessageMedia('image/webp', base64);
    await msg.reply(media, null, { sendMediaAsSticker: true });
  } catch (err) {
    await msg.reply('Gagal membuat sticker brat.');
  }
}

module.exports = bratCommand;
