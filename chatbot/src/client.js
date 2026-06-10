const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

function createClient() {
  const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './session' }),
    puppeteer: {
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  });

  client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code above with WhatsApp on your phone.');
  });

  client.on('authenticated', () => {
    console.log('Authenticated successfully.');
  });

  client.on('auth_failure', (msg) => {
    console.error('Authentication failed:', msg);
  });

  client.on('ready', () => {
    console.log('Client is ready!');
  });

  client.on('disconnected', (reason) => {
    console.log('Client disconnected:', reason);
  });

  return client;
}

module.exports = createClient;
