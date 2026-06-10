const helpCommand = require('./help');
const bratCommand = require('./brat');
const stickerCommand = require('./sticker');
const toimgCommand = require('./toimg');
const tovideoCommand = require('./tovideo');
const tiktokCommand = require('./tiktok');
const instagramCommand = require('./instagram');
const facebookCommand = require('./facebook');
const twitterCommand = require('./twitter');

const commands = {
  'help': helpCommand,
  'brat': bratCommand,
  'sticker': stickerCommand,
  's': stickerCommand,
  'toimg': toimgCommand,
  'tovideo': tovideoCommand,
  'tovid': tovideoCommand,
  'tiktok': tiktokCommand,
  'ig': instagramCommand,
  'instagram': instagramCommand,
  'fb': facebookCommand,
  'facebook': facebookCommand,
  'x': twitterCommand,
  'twitter': twitterCommand,
};

module.exports = commands;
