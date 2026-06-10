const { MessageMedia } = require('whatsapp-web.js');

const HELP_TEXT = `╔═══ *DAFTAR PERINTAH* ═══╗

▸ *.help*
  Menampilkan daftar perintah

▸ *.brat [teks]*
  Membuat sticker brat
  Contoh: .brat halo

▸ *.sticker* (.s)
  Convert gambar/video ke sticker
  Gunakan dengan reply media

▸ *.toimg*
  Convert sticker ke gambar
  Gunakan dengan reply sticker

▸ *.tovideo* (.tovid)
  Convert sticker animasi ke video
  Gunakan dengan reply sticker

▸ *.tiktok <url>*
  Download video TikTok

▸ *.ig <url>*
  Download media Instagram

▸ *.fb <url>*
  Download video Facebook

▸ *.x <url>*
  Download media Twitter/X

  "kalau mau nambah fitur atau 
  ikut kontribusi bilang aja ya"
╚════════════════════╝`;

async function helpCommand(msg) {
  await msg.reply(HELP_TEXT);
}

module.exports = helpCommand;
