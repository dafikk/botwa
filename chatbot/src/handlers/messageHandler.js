const commands = require('../commands');

const PREFIX = process.env.PREFIX || '.';
const HELP_MSG = 'kamu butuh bantuan? jalankan .help untuk melihat daftar tools';

async function messageHandler(msg, client) {
  if (msg.fromMe) return;

  const chat = await msg.getChat();
  const body = msg.body.trim();
  const botNumber = client.info.wid.user;

  const isMentioned = msg.mentionedIds && msg.mentionedIds.includes(botNumber);

  if (!body.startsWith(PREFIX)) return;

  const parts = body.slice(PREFIX.length).split(/ +/);
  const commandName = parts[0].toLowerCase();
  const args = parts.slice(1).join(' ');

  const handler = commands[commandName];

  if (handler) {
    try {
      await handler(msg, args);
    } catch (err) {
      await msg.reply('Terjadi error saat memproses perintah.');
    }
  } else if (isMentioned || !chat.isGroup) {
    await msg.reply(HELP_MSG);
  }
}

module.exports = messageHandler;
