# WhatsApp Bot

WhatsApp bot for stickers, media downloads, and brat-style image generation — built with [`whatsapp-web.js`](https://github.com/pedroslopez/whatsapp-web.js) (MultiDevice).

## Features

- **Stickers** — Convert images/videos to stickers, convert stickers back to images/video
- **Brat generator** — Render text as brat-style sticker images
- **Media downloader** — Download video/media from TikTok, Instagram, Facebook, Twitter/X (via `yt-dlp`)
- **MultiDevice** — Uses WhatsApp Web MultiDevice protocol; QR scan only once

## Prerequisites

- **Node.js** 18+
- **ffmpeg** (system binary, for video processing)
- **yt-dlp** — `pip install yt-dlp`

## Setup

```bash
cd chatbot
npm install
```

Edit `PREFIX` in `.env` if desired (default: `.`).

## Usage

```bash
cd chatbot
npm start
```

Scan the QR code with WhatsApp on your phone on first run. Session is saved to `chatbot/session/`.

### Commands

| Command | Description |
|---------|-------------|
| `.help` | Show all commands |
| `.brat <teks>` | Generate brat-style sticker |
| `.sticker` / `.s` | Convert replied image/video to sticker |
| `.toimg` | Convert replied sticker to image |
| `.tovideo` / `.tovid` | Convert replied sticker to video |
| `.tiktok <url>` | Download TikTok video |
| `.ig` / `.instagram <url>` | Download Instagram media |
| `.fb` / `.facebook <url>` | Download Facebook video |
| `.x` / `.twitter <url>` | Download Twitter/X media |

## Directory structure

```
chatbot/
├── src/
│   ├── index.js           # Entrypoint
│   ├── client.js          # WhatsApp client setup (LocalAuth, Chromium)
│   ├── handlers/
│   │   └── messageHandler.js
│   ├── commands/          # Per-command modules
│   └── utils/
│       ├── downloader.js  # yt-dlp wrapper
│       └── media.js       # sharp/ffmpeg image & video processing
├── media/                 # Downloaded files (gitignored)
├── session/               # Auth session (gitignored)
├── package.json
└── .env
```

## Tech

- **Runtime**: Node.js
- **WhatsApp**: `whatsapp-web.js` + Puppeteer (Chromium at `/usr/bin/chromium-browser`)
- **Image**: `sharp`
- **Video**: `ffmpeg` (system)
- **Downloader**: `yt-dlp` (called as subprocess)
