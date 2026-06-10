require('dotenv').config();
const createClient = require('./client');
const messageHandler = require('./handlers/messageHandler');

async function main() {
  const client = createClient();

  client.on('message', (msg) => messageHandler(msg, client));

  client.initialize();
}

main();
