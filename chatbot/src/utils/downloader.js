const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const MEDIA_DIR = path.join(__dirname, '../../media');

function downloadMedia(url, platform) {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    const outputBase = path.join(MEDIA_DIR, `${platform}_${timestamp}`);
    const args = [
      url,
      '-o', `${outputBase}.%(ext)s`,
      '--no-playlist',
      '--restrict-filenames',
      '--quiet',
      '--no-warnings',
    ];

    if (['tiktok', 'instagram', 'facebook', 'twitter', 'x'].includes(platform)) {
      args.push('--format', 'bv*[vcodec^=avc1][ext=mp4]+ba[ext=m4a]/bv*[ext=mp4]+ba/bv*+ba/b');
    }

    const proc = spawn('yt-dlp', args);
    let errorLog = '';

    proc.stderr.on('data', (data) => {
      errorLog += data.toString();
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`yt-dlp exited with code ${code}: ${errorLog.trim().split('\n').pop() || 'unknown error'}`));
      }
      const files = fs.readdirSync(MEDIA_DIR);
      const match = files.find(f => f.startsWith(`${platform}_${timestamp}`));
      if (match) {
        resolve(path.join(MEDIA_DIR, match));
      } else {
        reject(new Error('Downloaded file not found after yt-dlp finished.'));
      }
    });

    proc.on('error', () => {
      reject(new Error('yt-dlp not found. Install it: pip install yt-dlp'));
    });
  });
}

function cleanup(filePath) {
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch {}
}

module.exports = { downloadMedia, cleanup };
