const sharp = require('sharp');
const { execFile } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const execFileAsync = promisify(execFile);

const MEDIA_DIR = path.join(__dirname, '../../media');

async function imageToSticker(buffer) {
  return sharp(buffer)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ lossless: true })
    .toBuffer();
}

async function videoToSticker(inputPath) {
  const outputPath = path.join(MEDIA_DIR, `sticker_${Date.now()}.webp`);
  await execFileAsync('ffmpeg', [
    '-i', inputPath,
    '-vcodec', 'libwebp',
    '-lossless', '0',
    '-loop', '0',
    '-an',
    '-s', '512:512',
    '-preset', 'default',
    '-q:v', '50',
    '-y',
    outputPath,
  ]);
  const buffer = fs.readFileSync(outputPath);
  fs.unlinkSync(outputPath);
  return buffer;
}

async function stickerToImage(buffer) {
  return sharp(buffer)
    .png()
    .toBuffer();
}

async function stickerToVideo(inputPath) {
  const outputPath = path.join(MEDIA_DIR, `vid_${Date.now()}.mp4`);
  await execFileAsync('ffmpeg', [
    '-i', inputPath,
    '-movflags', 'faststart',
    '-pix_fmt', 'yuv420p',
    '-vf', 'scale=512:512',
    '-y',
    outputPath,
  ]);
  const buffer = fs.readFileSync(outputPath);
  fs.unlinkSync(outputPath);
  return buffer;
}

async function generateBratImage(text) {
  const words = text || 'brat';
  const chars = words.split('');

  let svgChars = '';
  let xOffset = 20;
  const fontSize = Math.max(30, Math.min(80, 400 / chars.length));

  chars.forEach((char) => {
    const rot = (Math.random() - 0.5) * 20;
    const yOff = (Math.random() - 0.5) * 15;
    svgChars += `<text x="${xOffset}" y="260" font-size="${fontSize}" font-family="Arial, sans-serif" fill="white" transform="rotate(${rot}, ${xOffset}, 260) translate(0, ${yOff})">${char === ' ' ? ' ' : char}</text>`;
    xOffset += fontSize * 0.65;
  });

  const svg = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" fill="black"/>
    ${svgChars}
  </svg>`;

  return sharp(Buffer.from(svg))
    .resize(512, 512)
    .webp()
    .toBuffer();
}

module.exports = { imageToSticker, videoToSticker, stickerToImage, stickerToVideo, generateBratImage };
